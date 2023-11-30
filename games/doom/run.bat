:menu
@echo off
cls
echo.
echo Press 1 for Doom w/ Gravis Ultrasound
echo Press 2 for Doom w/ SoundBlaster
echo Press 3 for Doom w/ Sound Canvas
echo Press 4 to Quit
echo.
choice /C:1234 /N Please Choose:

if errorlevel = 4 goto quit
if errorlevel = 3 goto SC55
if errorlevel = 2 goto SB16
if errorlevel = 1 goto GUS

:GUS
CONFIG -set "mididevice=default"
del DEFAULT.CFG
copy .\gus\*.*
cd ultrasnd
ultramid
pause
cd ..
cls
@DOOM
goto quit

:SB16
CONFIG -set "mididevice=default"
del DEFAULT.CFG
copy .\sb16\*.*
cls
@DOOM
goto quit

:SC55
CONFIG -set "mididevice=fluidsynth"
del DEFAULT.CFG
copy .\sc55\*.*
cls
@DOOM
goto quit

:quit
exit