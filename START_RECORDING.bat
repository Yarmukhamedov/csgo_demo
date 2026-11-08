@echo off
title CSDEMO - CS2 Professional Movie Recorder (Ultra 1080p 60 FPS)
cls
echo ======================================================================
echo    CSDEMO.UZ - CS2 REAL BROADCAST MOVIE MAKER (PRO EDITION)
echo ======================================================================
echo.
echo  [*] Sifat: Ultra High-Bitrate (CRF 12 Lossless, 60 FPS)
echo  [*] Holat: Xavfsiz rejim (-insecure faol, VAC butunlay o'chirilgan)
echo  [*] Dvigatel: HLAE AfxHookSource2 + FFmpeg MP4
echo  [*] Demo fayli: my_highlight.dem
echo.
echo  ----------------------------------------------------------------------
echo  O'YIN ICHIDA BOSHQARISH TUGMALARI:
echo.
echo    [F5]  - KINO REJIMI: Butunlay toza kamera (HP, Armor, Radar YO'Q)
echo    [F6]  - ESPORTS REJIMI: Faqat Killfeed va Nishon (Tavsiya etiladi)
echo    [F7]  - STANDART REJIM: O'yinning asl HUD'ini qaytarish
echo.
echo    [F9]  - Rolik yozishni BOSHLASH (Start Ultra Record)
echo    [F10] - Rolik yozishni TO'XTATISH va MP4 saqlash (Stop Record)
echo  ----------------------------------------------------------------------
echo.
echo  CS2 ochilmoqda, iltimos kuting...
start "" "c:\Users\Mukhammad\Documents\Projects\CSDemo\tools\hlae\HLAE.exe" -customLoader -noGui -autoStart -hookDllPath "c:\Users\Mukhammad\Documents\Projects\CSDemo\tools\hlae\x64\AfxHookSource2.dll" -programPath "E:\Steam\steamapps\common\Counter-Strike Global Offensive\game\bin\win64\cs2.exe" -cmdLine "-steam -insecure +sv_lan 1 -console -novid -afxDisableSteamStorage +exec csdemo_record.cfg +playdemo my_highlight"

echo.
echo ======================================================================
echo  CS2'da F9 va F10 bilan video yozib bo'lganingizdan so'ng,
echo  ushbu oynaga qaytib istalgan tugmani bosing. 
echo  Dastur yangi videoni toza o'yin ovozi bilan birlashtirib beradi!
echo ======================================================================
echo.
pause
call "c:\Users\Mukhammad\Documents\Projects\CSDemo\PROCESS_CLIPS.bat"
