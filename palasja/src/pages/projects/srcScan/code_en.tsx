const FreeSpace = ` @echo off
 title FreeSpace
	echo == %Time% - Start FreeSpace == >> %fileLog%
 rem - Check free sace on servers
 rem "wmic volume get driveletter^, freespace" Return volume letter and free space.

	set FileName="log name"
	set xml=%pathXML%\%FileName%.xml
	if EXIST %xml% (del /F %xml%)

echo ^<?xml version=^"1.0^" encoding=^"UTF-8^"?^> >> %xml%
echo ^<head^> >> %xml%
echo 	^<freespace^> >> %xml%
echo 		^<Server^>%COMPUTERNAME:~-5%^</Server^> >> %xml%
	FOR /F "usebackq skip=1 delims=" %%i IN ('wmic volume get driveletter^, freespace') DO Call :getXML %%i
echo 	^</freespace^> >> %xml%
echo ^</head^> >> %xml%
	%UtilsDir%\blat.exe -body " " -to %Users% -f "%COMPUTERNAME%@mail.by" -s " %FileName% " -server %mailServer% -attacht %xml%
	echo == %Time% - OK == >> %fileLog%
	exit /B

	:getXML
	set str=%*
	set disk=%str:~0,1%
	if "%disk:~0,1%"=="~" (exit /B)
	set freeSpace=%str:~13%
	if "%freeSpace%"=="" (exit /B)
echo 			^<%disk%^>%freeSpace%^</%disk%^> >> %xml%
	exit /B`;
const UnlodaFile = `echo off
title UnloadFile
 echo == %Time% - Start UnloadFile == >> %fileLog%
 rem - Check undownloaded failes. getXML return name, date, timae

	set FileName="filename"
	set xml=%pathXML%\%FileName%.xml
	set path1=D:\path1\
	set path2=D:\path2\
	set path3=D:\path3\
	set path4=D:\path4\
	set path5=D:\path5\

	if EXIST %xml% (del /F %xml%)

echo ^<?xml version=^"1.0^" encoding=^"UTF-8^"?^> >> %xml%
echo ^<head^> >> %xml%
echo 	^<UndownloadFile^> >> %xml%
echo 		^<Server^>%COMPUTERNAME:~-5%^</Server^> >> %xml%
	FOR /F "usebackq delims= " %%I IN (${'`'}dir /B /O /S %path1%${'`'}) DO Call :getXML %%~ftxI
	FOR /F "usebackq delims= " %%I IN (${'`'}dir /B /O /S %path2%${'`'}) DO Call :getXML %%~ftxI
	FOR /F "usebackq delims= " %%I IN (${'`'}dir /B /O /S %path3%${'`'}) DO Call :getXML %%~ftxI
	FOR /F "usebackq delims= " %%I IN (${'`'}dir /B /O /S %path4%${'`'}) DO Call :getXML %%~ftxI
	FOR /F "usebackq delims= " %%I IN (${'`'}dir /B /O /S %path5%${'`'}) DO Call :getXML %%~ftxI

echo 	^</UndownloadFile^> >> %xml%
echo ^</head^> >> %xml%
	%UtilsDir%\blat.exe -body " " -to %Users% -f "%COMPUTERNAME%@mail.by" -s " %FileName% " -server %mailServer% -attacht %xml%
	echo == %Time% - OK == >> %fileLog%
	exit /B


	:getXML
	FOR /F "usebackq tokens=1,2,3 delims= " %%a IN (${'`'}echo %*${'`'}) DO set date=%%a && set timef=%%b && set NameFile=%%c
	if "%NameFile:~-3%"=="rar" (exit /B)
echo 		^<File ^> >> %xml%
echo 			^<NameFile^>%NameFile%^</NameFile^> >> %xml%
echo 			^<date^>%date%^</date^> >> %xml%
echo 			^<time^>%timef%^</time^> >> %xml%
echo 		^</File^> >> %xml%
	exit /B`;
const Bak = `
  @echo off
  title Backup
	echo == %Time% - Start Backup == >> %fileLog%
 rem - check is exist backup for all base  (old Backup and backup zero size sould't be there)
 rem  PathBackups is path to bbackup folder. getXML find folders. getInfo return file info (name, extention, date, size), exclude logs and zip (rar, log String 40-41).
 rem testChar compare first char of folder name with list of characters in str for exlute cyrilyc name folders.
	set PathBackups="path to backups F:\Back"
	set str=ARCDPTQWEYUIOSDFGHJKLZXVBNM+
	set FileName=Bak_%COMPUTERNAME:~-5%
	set xml=%pathXML%\%FileName%.xml

	if EXIST %xml% (del /F %xml%)

echo ^<?xml version=^"1.0^" encoding=^"UTF-8^"?^> >> %xml%
echo ^<head^> >> %xml%
echo 	^<Backup^> >> %xml%
echo 		^<Server^>%COMPUTERNAME:~-5%^</Server^> >> %xml%
	FOR /F "usebackq delims=" %%i IN (${'`'}dir /B /AD /O %PathBackups%${'`'}) DO Call :getXML %%i
echo 	^</Backup^> >> %xml%
echo ^</head^> >> %xml%
	%UtilsDir%\blat.exe -body " " -to %Users% -f "%COMPUTERNAME%@mail.by" -s " %FileName% " -server %mailServer% -attacht %xml%
	echo == %Time% - OK == >> %fileLog%
	exit /B

	:getXML
	set i=0
	set res=0
	set db=%*
	Call :testChar
	set PathDB=%PathBackups%\%1
	if "%res%"=="0" (exit /B)
echo 		^<%*^> >> %xml%
	FOR /F "usebackq delims= " %%I IN (${'`'}dir /A-D /B /O /S "%PathDB%"${'`'}) DO Call :getInfo %%~ntzxI
echo 
echo 		^</%*^> >> %xml%
	exit /B

	:getInfo
	FOR /F "usebackq tokens=1,2,3,4 delims= " %%a IN (${'`'}echo %*${'`'}) DO set date=%%a && set timeb=%%b && set capacity=%%c && set nameBAK=%%d
	if "%nameBAK:~0,1%"=="~" (exit /B)
	if "%nameBAK:~-3%"=="log" (exit /B)
	if "%nameBAK:~-3%"=="rar" (exit /B)
	if "%nameBAK:~-3%"=="bak" (set nameBAK=%nameBAK:~0,-3%BAK)
	set format=%nameBAK:~-3%
echo 			^<%format%^> >> %xml%
echo 				^<PathDB^>%PathDB%^</PathDB^> >> %xml%
echo 				^<name^>%nameBAK%^</name^> >> %xml%
echo 				^<date^>%date%^</date^> >> %xml%
echo 				^<time^>%timeb%^</time^> >> %xml%
echo 				^<capacity^>%capacity%^</capacity^> >> %xml%
echo 			^</%format%^> >> %xml%
	exit /B

	:testChar
	Call Set ch=%%str:~%i%,1%%
	set /a i=%i%+1
	if %db:~0,1%==%ch% (set res=1 && exit /B)
	if "%ch%"=="+" (exit /B)
	goto testChar
`;
const CheckTaskSync = `
echo off
title TestSync
	echo == %Time% - Start TestSync == >> %fileLog%
 rem  - check synchronization with bacakup file server
 rem Check state of last synchronization task run and write it ti file

	set FileName=TestSync_%COMPUTERNAME:~-5%
	set xml=%pathXML%\%FileName%.xml
	set taskName="syncTaskName"
	if EXIST %xml% (del /F %xml%)

echo ^<?xml version=^"1.0^" encoding=^"UTF-8^"?^> >> %xml%
echo ^<head^> >> %xml%
echo 	^<ChekSync^> >> %xml%
echo 		^<Server^>%COMPUTERNAME:~-5%^</Server^> >> %xml%
	FOR /F "usebackq skip=2 delims=" %%I IN (${'`'}schtasks /Query /V /NH /TN %taskName%${'`'}) DO Call :getXML %%I
echo 	^</ChekSync^> >> %xml%
echo ^</head^> >> %xml%
	%UtilsDir%\blat.exe -body " " -to %Users% -f "%COMPUTERNAME%@mail.by" -s " %FileName% " -server %mailServer% -attacht %xml%
	echo == %Time% - OK == >> %fileLog%
	exit /B

	:getXML
	set t=%*
	set lastRun=%t:~121,19%
	set result=%t:~155,1%

echo 			^<%taskName%^> >> %xml%
echo 				^<LastRun^>%lastRun%^</LastRun^> >> %xml%
echo 				^<Result^>%result%^</Result^> >> %xml%
echo 			^</%taskName%^> >> %xml%
	exit /B
`;
const CopyBak = `
echo off
title CopyBak
	echo == %Time% - Start CopyBak == >> %fileLog%
REM Scan log of execute task copy db with PC and check last synchronization.
rem markEnd - sign end of copy session; mask - pattern file log.

	set logDir="path to logs"
	set mask="mask log file"
	set markEnd="end stiring"
	set FileName="writed file"
	set xml=%pathXML%\%FileName%.xml

	if EXIST %xml% (del /F %xml%)
rem Find file by mask
echo ^<?xml version=^"1.0^" encoding=^"UTF-8^"?^> >> %xml%
echo ^<head^> >> %xml%
echo 	^<BakcupCopy^> >> %xml%
	FOR /F "usebackq delims=" %%I IN (${'`'}dir /B %logdir%\%mask% ${'`'}) DO Call :scan %%I
echo 	^</BakcupCopy^> >> %xml%
echo ^</head^> >> %xml%

	%UtilsDir%\blat.exe -body " " -to %Users% -f "%COMPUTERNAME%@mail.by" -s " %FileName% " -server %mailServer% -attacht %xml%
	echo == %Time% - OK == >> %fileLog%
	exit /B

rem Log file has ennd string only, if first running there should be unusual check
	:scan
	if "%1"=="" (exit /B)
	set fN=%1
	set PCName=%fN:~0,-4%
	set num=0
echo 			^<PCName^>%PCName:~-7%^</PCName^> >> %xml%
	set log=%logdir%\%fN%
	FOR /F "usebackq delims=" %%I IN (${'`'}find  /C "%markEnd%" %log% ${'`'}) DO set str=%%I
	FOR /F "usebackq tokens=3 delims=:" %%I IN (${'`'}echo %str%${'`'}) DO set /a count=0+%%I
	if %count%==1 (goto one)
	set /a count=%count%-2
	FOR /F "usebackq skip=%count% delims=" %%I IN (${'`'}findstr /N /B /P /C:%markEnd% %log% ${'`'}) DO (set str=%%I && goto many)

rem if moe than two session in lig file write last session
	:many
	FOR /F "usebackq  delims=:" %%N IN (${'`'}echo %str%${'`'}) DO set /a NumStr=0+%%N
	FOR /F "skip=%NumStr% delims=" %%I IN (%log%) DO Call :logDirStr %%I

rem For only one session log
	:one
	FOR /F "delims=" %%I IN (%log%) DO Call :logDirStr %%I

rem Write to XML
	:logDirStr
	set /a num=%num%+1
	if '%num%' GTR '3' ( exit /B)
if %num%==1 (echo 					^<User^>%1^</User^> >> %xml%)
if %num%==2 (echo 					^<date^>%1^</date^> >> %xml%)
if %num%==3 (echo 					^<time^>%1^</time^> >> %xml%)
	exit /B

`;
const ErrorLoadScan = `
 @echo off
 title ErrorLoad
	echo == %Time% - Start ErrorLoadScan == >> %fileLog%
rem Find and write to log all files in error folder
	set FileName="log file name"
	set logPath=%pathBat%\%FileName%

	set folder1=D:\folder1\
	set folder2=D:\folder2\
	set folder3=D:\folder3\
	set folder4=D:\folder4\
	set folder5=D:\folder5\
	set folder6=D:\folder6\
	
	chcp 1251
	FOR %%A IN (%folder1%,%folder2%,%folder3%,%folde�4%,%folder5%,%folder6%) DO CALL :checkFile %%A
	if NOT EXIST %logPath% (echo %computername%;%date% %time:~0,8%;NULL >> %logPath%)
	%UtilsDir%\blat.exe -body " " -to %Users% -f "%COMPUTERNAME%@mail.by" -s " %FileName% " -server %mailServer% -attacht %logPath%
	del %logPath%
	echo == %Time% - OK == >> %fileLog%
	exit /B
	
:checkFile
	set path=%*
	FOR /F "eol= usebackq delims=" %%B IN (${'`'}dir /B /A-D %path%${'`'}) DO CALL :writeLog %%B
	exit /B
	
:writeLog
	echo %computername%;%date% %time:~0,8%;%path%;%* >> %logPath%
	exit /B
`;
const RuningProgram = `
echo off
title RuningProgram
 rem - CHeck soft is running. Find path in tasklist if it exist write it to file
	echo == %Time% - Start RuningProgram == >> %fileLog%
	set FileName="FileName"
	set xml=%pathXML%\%FileName%.xml
	set Path1="D:\\1\a.exe"
	set Path2="D:\\2\b.exe"
	set Path3="D:\\3\c.exe"

	if EXIST %xml% (del /F %xml%)

echo ^<?xml version=^"1.0^" encoding=^"UTF-8^"?^> >> %xml%
echo ^<head^> >> %xml%
echo 	^<RunProgram^> >> %xml%
echo 		^<Server^>%COMPUTERNAME:~-5%^</Server^> >> %xml%
	FOR /F "usebackq eol=C delims=" %%I IN (${'`'}wmic PROCESS get ExecutablePath${'`'}) DO Call :Test %%I
echo 	^</RunProgram^> >> %xml%
echo ^</head^> >> %xml%
	%UtilsDir%\blat.exe -body " " -to %Users% -f "%COMPUTERNAME%@mail.by" -s " %FileName% " -server %mailServer% -attacht %xml%
	echo == %Time% - OK == >> %fileLog%
	exit /B

	:Test
	set testPath="%*"
	if %testPath%=="%Path1%" (Call :getXML)
	if %testPath%=="%Path2%" (Call :getXML)
	if %testPath%=="%Path3%" (Call :getXML)
	exit /B

	:getXML
echo 				^<Runing^>%testPath%^</Runing^> >> %xml%
	exit /B


`;
const ProgError = `
echo off
rem  upload last error from applications log to XML. count of errors in load variable.
	title TCMError
	echo == %Time% - Start TCMError == >> %fileLog%
	set FileName="LogName"
	set xml=%pathXML%\%FileName%.xml
	set TCMIn="fog file folder 1"
	set TCMOut="fog file folder 2"
	set markEnd================================
	set load=10
	
	if EXIST %xml% (del /F %xml%)

echo ^<?xml version=^"1.0^" encoding=^"WINDOWS-1251^"?^> >> %xml%
echo ^<head^> >> %xml%
echo ^<TCMError^> >> %xml%
echo ^<Server^>%COMPUTERNAME:~-5%^</Server^> >> %xml%
echo ^<TCMIn^> >> %xml%
	set log=%TCMIn%
	set q=0
rem calculate count of error and write it to q, skip 2 that strings whitch writed find. Then skkip all useles and write last to XML
	FOR /F "usebackq skip=2 delims=" %%I IN (${'`'}find /I /N "%markEnd%" %log% ${'`'}) DO CALL :skip
	set /a s=%q%+2-%load%
	if %s% LEQ 2 (FOR /F "usebackq delims=]" %%I IN (${'`'}find /I /N "%markEnd%" %log% ${'`'}) DO CALL :XML %%I)
	FOR /F "usebackq skip=%s% delims=]" %%I IN (${'`'}find /I /N "%markEnd%" %log% ${'`'}) DO CALL :XML %%I
echo ^</TCMIn^> >> %xml%

echo ^<TCMOut^> >> %xml%
	set log=%TCMOut%
	set q=0
	FOR /F "usebackq skip=2 delims=" %%I IN (${'`'}find /I /N "%markEnd%" %log% ${'`'}) DO CALL :skip
	set /a s=%q%+2-%load%
	if %s% LEQ 2 (FOR /F "usebackq delims=]" %%I IN (${'`'}find /I /N "%markEnd%" %log% ${'`'}) DO CALL :XML %%I)
	FOR /F "usebackq skip=%s% delims=]" %%I IN (${'`'}find /I /N "%markEnd%" %log% ${'`'}) DO CALL :XML %%I
echo ^</TCMOut^> >> %xml%
echo ^</TCMError^> >> %xml%
echo ^</head^> >> %xml%
	%UtilsDir%\blat.exe -body " " -to %Users% -f "%COMPUTERNAME%@mail.by" -s " %FileName% " -server %mailServer% -attacht %xml%
	echo == %Time% - OK == >> %fileLog%
	exit /B

	:XML
	set t=%1
	if "%t:~0,1%"=="-" (exit /B)
	set /a str=%t:~1%-1
	set q=0
	if "%str%"=="0" (FOR /F "delims=" %%E IN (%log%) DO if %q% GEQ 2 (exit /B) else (CALL :count %%E))
	FOR /F "skip=%str% delims=" %%E IN (%log%) DO if %q% GEQ 2 (exit /B) else (CALL :count %%E)
	exit /B

	:count
	set t=%*
	if "%t:~0,1%"=="-" (exit /B)
	if %q% GEQ 2 (exit /B)
	set /a q=%q%+1
	if %q%==1 (FOR /F "usebackq tokens=1,2 delims= " %%a IN (${'`'}echo %t% ${'`'}) DO Call :getDateErr %%a %%b)
	if %q%==2 (
echo ^<TypeErr^>%t%^</TypeErr^> >> %xml%
echo ^</ErrData^> >> %xml%
	)
	exit /B

	:skip
	set /a q=%q%+1
	exit /B

	:getDateErr
	set dateErr=%1
	set timeErr=%2
echo ^<ErrData^> >> %xml%
echo ^<date^>%dateErr%^</date^> >> %xml%
echo ^<time^>%timeErr%^</time^> >> %xml%
	exit /B
`;
const Readme = `
RUN_XML.bat run bat whitch create and send XML files. For sending is use account whitch running RUN_XML.
Without any params it run all 8.
For start separate bat there have to write their number as params whit whitespace.
 Example:"RUN_XML.bat 2 5" create xml whitch was backup info and running programs.
1 - Run freeSpace.bat (freeSpace)
2 - Run Bak.bat (Check created backups)
3 - Run UnLoadFile.bat (unload files)
4 - Run TCMError.bat (Scan errros)
5 - Run RuningProgram.bat (chek prorrams is running)
6 - Run ChekTaskSync.bat (last synchronization state)
7 - Run TestCopyBak.bat (last backup copy)
8 - Run ErrorLoadScan.bat (ErrorFiles)

To %fileLog% write log RUN_XML: params, start\end execute. 
`;

const srvScanCode = {
	errorLoadScan: ErrorLoadScan,
  progError: ProgError,
  readme: Readme,
  runingProgram: RuningProgram,
  bak: Bak,
  checkTaskSync: CheckTaskSync,
  copyBak: CopyBak,
  freeSpace: FreeSpace,
  unloadFiles: UnlodaFile
}
export default srvScanCode