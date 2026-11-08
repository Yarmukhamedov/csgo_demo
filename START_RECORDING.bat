@echo off
title CSDEMO - CS2 Real Movie Recorder (HLAE + FFmpeg)
cls
echo ======================================================================
echo    CSDEMO.UZ - CS2 REAL BROADCAST MOVIE MAKER (1080p 60 FPS)
echo ======================================================================
echo.
echo  [*] Holat: Xavfsiz rejim (-insecure faol, VAC butunlay o'chirilgan)
echo  [*] Dvigatel: HLAE AfxHookSource2 + FFmpeg MP4
echo  [*] Demo fayli: my_highlight.dem
echo.
echo  ----------------------------------------------------------------------
echo  BUYRUQLAR (O'YIN ICHIDA):
echo    [F9]  - Video rolikni yozishni BOSHLASH (Start Record)
echo    [F10] - Video rolikni yozishni TO'XTATISH va MP4 saqlash (Stop Record)
echo  ----------------------------------------------------------------------
echo.
echo  CS2 ochilmoqda, iltimos kuting...
start "" "c:\Users\Mukhammad\Documents\Projects\CSDemo\tools\hlae\HLAE.exe" -customLoader -noGui -autoStart -hookDllPath "c:\Users\Mukhammad\Documents\Projects\CSDemo\tools\hlae\x64\AfxHookSource2.dll" -programPath "E:\Steam\steamapps\common\Counter-Strike Global Offensive\game\bin\win64\cs2.exe" -cmdLine "-steam -insecure +sv_lan 1 -console -novid -afxDisableSteamStorage +exec csdemo_record.cfg +playdemo my_highlight"

echo.
echo ======================================================================
echo  CS2'da F9 va F10 bilan video yozib bo'lganingizdan so'ng,
echo  ushbu oynaga qaytib istalgan tugmani bosing. 
echo  Dastur videoni toza o'yin ovozi bilan birlashtirib papkani ochadi!
echo ======================================================================
echo.
pause
call "c:\Users\Mukhammad\Documents\Projects\CSDemo\PROCESS_CLIPS.bat"
