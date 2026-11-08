import { HighlightMoment, PlayerStats, ReelSettings } from "@/types/demo";

export interface VideoRecordOptions {
  highlights: HighlightMoment[];
  player?: PlayerStats;
  settings: ReelSettings;
  mapName: string;
  onProgress: (percent: number) => void;
}

/**
 * Client-Side Real Video Generator using HTML5 Canvas & MediaRecorder.
 * Generates an actual playable video file (WebM / MP4 compatible) directly in the browser.
 */
export async function generateHighlightVideo(options: VideoRecordOptions): Promise<Blob> {
  const { highlights, player, settings, mapName, onProgress } = options;

  const isVertical = settings.aspectRatio === "9:16";
  const width = isVertical ? 720 : 1280;
  const height = isVertical ? 1280 : 720;
  const fps = 30;

  // Create offscreen canvas
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Canvas context is not supported in this browser.");
  }

  // Setup Web Audio for sound effects and music
  const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  const dest = audioCtx.createMediaStreamDestination();

  // Create stream from canvas + audio
  const canvasStream = canvas.captureStream(fps);
  if (dest.stream.getAudioTracks().length > 0) {
    canvasStream.addTrack(dest.stream.getAudioTracks()[0]);
  }

  // Determine supported mime type
  let mimeType = "video/webm;codecs=vp9";
  if (!MediaRecorder.isTypeSupported(mimeType)) {
    mimeType = "video/webm";
    if (!MediaRecorder.isTypeSupported(mimeType)) {
      mimeType = "video/mp4";
    }
  }

  const recorder = new MediaRecorder(canvasStream, {
    mimeType: MediaRecorder.isTypeSupported(mimeType) ? mimeType : undefined,
    videoBitsPerSecond: 4500000, // 4.5 Mbps high quality
  });

  const chunks: Blob[] = [];
  recorder.ondataavailable = (e) => {
    if (e.data.size > 0) chunks.push(e.data);
  };

  const recordingPromise = new Promise<Blob>((resolve, reject) => {
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: mimeType });
      resolve(blob);
    };
    recorder.onerror = (err) => reject(err);
  });

  recorder.start();

  // Total frames: intro (2 sec = 60 frames) + 3.5 sec per clip (105 frames)
  const introDurationFrames = settings.showIntroCard ? 60 : 0;
  const clipDurationFrames = 105;
  const totalFrames = introDurationFrames + Math.min(highlights.length, 3) * clipDurationFrames;

  // Sound synthesize helper (CS2 headshot dink / bass drop)
  const playSoundEffect = (freq: number, type: OscillatorType = "sine", duration: number = 0.15) => {
    try {
      if (settings.musicTrack === "none") return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.25, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(dest);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio context might be restricted, ignore silently
    }
  };

  let currentFrame = 0;

  // Render Loop
  while (currentFrame < totalFrames) {
    onProgress(Math.min(99, Math.round((currentFrame / totalFrames) * 100)));

    // Background gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    bgGrad.addColorStop(0, "#080c16");
    bgGrad.addColorStop(0.5, "#0e1526");
    bgGrad.addColorStop(1, "#070a12");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Subtle tactical grid
    ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // PHASE 1: Render Intro Card
    if (currentFrame < introDurationFrames) {
      if (currentFrame === 1) playSoundEffect(300, "triangle", 0.3);

      ctx.save();
      // Center card
      const cardW = width * 0.85;
      const cardH = height * 0.45;
      const cardX = (width - cardW) / 2;
      const cardY = (height - cardH) / 2;

      ctx.fillStyle = "rgba(12, 18, 32, 0.95)";
      ctx.strokeStyle = "#f59e0b";
      ctx.lineWidth = 3;
      roundRect(ctx, cardX, cardY, cardW, cardH, 24);
      ctx.fill();
      ctx.stroke();

      // Title
      ctx.fillStyle = "#ffffff";
      ctx.font = `bold ${Math.round(width * 0.065)}px sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText(player?.name || "CS2 PLAYER", width / 2, cardY + cardH * 0.32);

      // Subtitle: Rank
      ctx.fillStyle = "#f59e0b";
      ctx.font = `bold ${Math.round(width * 0.038)}px sans-serif`;
      ctx.fillText(
        `FACEIT LVL ${player?.faceitLevel || 10} • ${(player?.premierRating || 18500).toLocaleString()} ELO`,
        width / 2,
        cardY + cardH * 0.48
      );

      // Stats row
      ctx.fillStyle = "#94a3b8";
      ctx.font = `${Math.round(width * 0.032)}px sans-serif`;
      ctx.fillText(
        `K/D: ${player ? (player.kills / Math.max(1, player.deaths)).toFixed(2) : "1.85"}   |   ADR: ${player?.adr.toFixed(0) || "95"}   |   HS: ${player?.hsPercentage || "58"}%`,
        width / 2,
        cardY + cardH * 0.72
      );

      ctx.restore();
    } 
    // PHASE 2: Render Gameplay Clip & Killfeed
    else {
      const clipFrame = currentFrame - introDurationFrames;
      const clipIndex = Math.min(
        highlights.length - 1,
        Math.floor(clipFrame / clipDurationFrames)
      );
      const activeClip = highlights[clipIndex];
      const clipLocalFrame = clipFrame % clipDurationFrames;

      // Play kill sound on specific moments
      if (clipLocalFrame === 10 || clipLocalFrame === 35 || clipLocalFrame === 65) {
        playSoundEffect(1200, "square", 0.08); // High pitched CS2 headshot dink
      }

      // Center crosshair
      ctx.strokeStyle = "#10b981";
      ctx.lineWidth = 2;
      const cx = width / 2;
      const cy = height / 2;
      ctx.beginPath();
      ctx.moveTo(cx - 14, cy);
      ctx.lineTo(cx + 14, cy);
      ctx.moveTo(cx, cy - 14);
      ctx.lineTo(cx, cy + 14);
      ctx.stroke();

      // Top Map & Logo Badge
      ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
      roundRect(ctx, 30, 40, width - 60, 50, 12);
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 16px sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(`CSDEMO.UZ • ${mapName.toUpperCase()}`, 50, 72);

      ctx.fillStyle = "#f59e0b";
      ctx.textAlign = "right";
      ctx.fillText(`RAUND ${activeClip.roundNumber}`, width - 50, 72);

      // Killfeed on top-right
      let feedY = 110;
      activeClip.kills.forEach((k, idx) => {
        // Stagger killfeed appearance
        if (clipLocalFrame > idx * 25) {
          ctx.fillStyle = "rgba(0, 0, 0, 0.85)";
          ctx.strokeStyle = "#f59e0b";
          ctx.lineWidth = 1.5;
          const kBoxW = width * 0.75;
          roundRect(ctx, width - kBoxW - 30, feedY, kBoxW, 42, 10);
          ctx.fill();
          ctx.stroke();

          // Killer Name
          ctx.fillStyle = "#f59e0b";
          ctx.font = "bold 14px sans-serif";
          ctx.textAlign = "left";
          ctx.fillText(activeClip.killerName, width - kBoxW - 15, feedY + 26);

          // Weapon & HS
          ctx.fillStyle = "#ffffff";
          ctx.font = "12px sans-serif";
          ctx.fillText(`[${k.weapon}${k.isHeadshot ? " ⚡HS" : ""}]`, width - kBoxW + 110, feedY + 26);

          // Victim
          ctx.fillStyle = "#cbd5e1";
          ctx.fillText(k.victimName, width - 110, feedY + 26);

          feedY += 52;
        }
      });

      // Bottom Highlight Title Badge
      ctx.fillStyle = "rgba(12, 18, 32, 0.9)";
      ctx.strokeStyle = "#00d2ff";
      ctx.lineWidth = 2;
      const bottomW = width - 60;
      roundRect(ctx, 30, height - 120, bottomW, 80, 16);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#00d2ff";
      ctx.font = "bold 12px sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(activeClip.type.toUpperCase() + " MOMENT", 50, height - 90);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 16px sans-serif";
      ctx.fillText(activeClip.title, 50, height - 62);
    }

    currentFrame++;
    // Small delay to yield to browser UI
    await new Promise((r) => setTimeout(r, 10));
  }

  recorder.stop();
  onProgress(100);

  return recordingPromise;
}

// Utility for rounded rectangle on Canvas
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
