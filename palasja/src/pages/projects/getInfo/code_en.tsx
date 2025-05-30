export const Code = `
echo off
rem Собирает статистику по ПК
rem Yakubenko IA
	chcp 866
	title Тех. обслуживание
	CHDIR /D D:\TO
	set pathBat=%CD%
	set FileName=%COMPUTERNAME%
	set html=%pathBat%\%FileName%.html
	del %html%
	if "%COMPUTERNAME:~0,2%" NEQ "F3" (start dfrgui.exe)
	if "%COMPUTERNAME:~0,2%" NEQ "F3" (start eventvwr.msc)
echo ^<html^>  >> %html%
echo ^<head^>  >> %html%
echo ^<meta charset="CP866"^>  >> %html%
echo ^<title^>%FileName%^</title^>  >> %html%
echo ^<style type="text/css"^>  >> %html%
	for /F "delims=" %%I IN (%pathBat%\TO.css) DO echo %%I >> %html%
echo ^</style^>  >> %html%
echo ^</head^>  >> %html%
echo ^<body^>  >> %html%
	for /F "delims=" %%I IN (%pathBat%\recomendation.html) DO echo %%I >> %html%
	echo ПК конфиг...
	set count=0
echo	^<table^> >> %html%
echo		^<caption^>^<h3^>ПК конфиг^</h3^>^</caption^> >> %html%
	FOR /F "eol= usebackq skip=2 tokens=2* delims==" %%A IN (${'`'}wmic /LOCALE:MS_409 os get Caption^, SystemDrive /VALUE${'`'}) DO CALL :OSInfo %%A
	FOR /F "eol= usebackq skip=2 tokens=2* delims==" %%A IN (${'`'}wmic /LOCALE:MS_409 nicconfig get ServiceName^, DatabasePath /VALUE${'`'}) DO CALL :NetCart %%A
	FOR /F "eol= usebackq skip=2 tokens=2* delims==" %%A IN (${'`'}wmic /LOCALE:MS_409 cpu get name /VALUE${'`'}) DO CALL :ProcInfo %%A
	FOR /F "eol= usebackq skip=2 tokens=2* delims==" %%A IN (${'`'}wmic /LOCALE:MS_409 BASEBOARD get product /VALUE${'`'}) DO CALL :BaseboardInfo %%A
echo	^</table^> >> %html%
echo	^</br^> >> %html%
	echo Оперативная память...
	set count=0
echo	^<table^> >> %html%
echo		^<caption^>^<h3^>Оперативная память^</h3^>^</caption^> >> %html%
echo		^<th^>Объем (MB)^</th^> >> %html%
echo		^<th^>Физический слот^</th^> >> %html%
echo		^<th^>Тактовая частота^</th^> >> %html%
	FOR /F "eol= usebackq skip=2 tokens=2* delims==" %%A IN (${'`'}wmic /LOCALE:MS_409 MEMORYCHIP get Capacity^, DeviceLocator^, Speed /VALUE${'`'}) DO CALL :RAM %%A
echo	^</table^> >> %html%
echo	^</br^> >> %html%
	echo Чиска временых каталогов...
echo 	^<table^> >> %html%
echo		^<caption^>^<h3^>Чиска временых каталогов^<h3^>^</caption^> >> %html%
echo		^<th^>Переменная^</th^> >> %html%
echo		^<th^>Путь^</th^> >> %html%
echo		^<th^>Результат^</th^> >> %html%
echo		^<tr^> >> %html%
echo			^<td^> TMP ^</td^> >> %html%
echo			^<td^>%TMP%^</td^> >> %html%
echo			^<td^> >> %html%
	(del /F /S /Q %TMP% 1>nul 2>& 1 && echo 				OK >> %html%) || echo 				ERROR >> %html%
echo			^</td^> >> %html%
echo		^</tr^> >> %html%
echo		^<tr^> >> %html%
echo			^<td^>TEMP^</td^> >> %html%
echo			^<td^>%TEMP%^</td^> >> %html%
echo			^<td^> >> %html%
	(del /F /S /Q %TEMP% 1>nul 2>& 1 && echo 				OK >> %html%) || echo 				ERROR >> %html%
echo			^</td^> >> %html%
echo		^</tr^> >> %html%
echo	^</table^> >> %html%
echo	^</br^> >> %html%
	echo SMART диска...
	set count=0
echo	^<table^> >> %html%
echo		^<caption^>^<h3^>SMART диска^</h3^>^</caption^> >> %html%
echo		^<th^>Диск^</th^> >> %html%
echo		^<th^>Статус^</th^> >> %html%
	FOR /F "eol= usebackq skip=2 tokens=2* delims==" %%A IN (${'`'}wmic /LOCALE:MS_409 diskdrive get model^, status /VALUE${'`'}) DO CALL :TestSMART %%A
echo	^</table^> >> %html%
echo	^</br^> >> %html%
	echo Создание точки восстановления...
	set count=0
	set pointName=TO
echo	^<table^> >> %html%
echo		^<caption^>^<h3^>Создание точки восстановления^</h3^>^</caption^> >> %html%
echo		^<th^>Название точки^</th^> >> %html%
echo		^<th^>Результат^</th^> >> %html%
	FOR /F "eol= usebackq skip=2 tokens=2* delims==" %%A IN (${'`'}wmic /Namespace:\\root\default Path SystemRestore Call CreateRestorePoint %pointName%^, 101^, 12${'`'}) DO CALL :RestorePoint %%A
echo	^</table^> >> %html%
echo	^</br^> >> %html%
	if "%COMPUTERNAME:~0,2%" NEQ "F3" (start rstrui.exe)
	set count=0
echo	^<table^> >> %html%
echo		^<caption^>^<h3^>Свободное место^</h3^>^</caption^> >> %html%
echo		^<th^>Раздел^</th^> >> %html%
echo		^<th^>Емкость (MB)^</th^> >> %html%
echo		^<th^>Свободно (MB)^</th^> >> %html%
echo		^<th^>Свободно в процентах^</th^> >> %html%
	FOR /F "eol= usebackq skip=2 tokens=2* delims==" %%A IN (${'`'}wmic /LOCALE:MS_409 volume get capacity^, caption^, freespace  /VALUE${'`'}) DO CALL :CheckFreespace %%A
echo	^</table^> >> %html%
echo	^</br^> >> %html%
	echo Установленные принтера...
	set count=0
echo	^<table^> >> %html%
echo		^<caption^>^<h3^>Установленные принтера^</h3^>^</caption^> >> %html%
echo		^<th^>По умолчанию^</th^> >> %html%
echo		^<th^>Используемый драйвер^</th^> >> %html%
echo		^<th^>Название^</th^> >> %html%
echo		^<th^>Порт^</th^> >> %html%
	FOR /F "eol= usebackq skip=2 tokens=2* delims==" %%A IN (${'`'}wmic /LOCALE:MS_409 printer get Name^, PortName^, Default^, DriverName /VALUE${'`'}) DO CALL :Printers %%~A
echo	^</table^> >> %html%
echo	^</br^> >> %html%
	echo Автозагрузка...
	set count=0
echo	^<table^> >> %html%
echo		^<caption^>^<h3^>Автозагрузка^</h3^>^</caption^> >> %html%
echo		^<th^>Название^</th^> >> %html%
echo		^<th^>Путь^</th^> >> %html%
echo		^<th^>Описание^</th^> >> %html%
	FOR /F "eol= usebackq skip=2 tokens=2* delims==" %%A IN (${'`'}wmic /LOCALE:MS_409 STARTUP get Command^, name^, Description /VALUE${'`'}) DO CALL :Startup %%A
echo	^</table^> >> %html%
echo	^</br^> >> %html%
	echo Назначеные задания...
	set count=0
echo	^<table^> >> %html%
echo		^<caption^>^<h3^>Назначеные задания^</h3^>^</caption^> >> %html%
echo		^<th^>Имя задачи^</th^> >> %html%
echo		^<th^>Состояние^</th^> >> %html%
echo		^<th^>Прошлый результат^</th^> >> %html%
echo		^<th^>Автор^</th^> >> %html%
echo		^<th^>Задача для выполнения^</th^> >> %html%
	FOR /F "usebackq skip=1 tokens=2,4,7,8,9 delims=," %%a IN (${'`'}SCHTASKS /Query /FO CSV /V${'`'}) DO CALL :Jobs %%a %%b %%c %%d %%e
echo	^</table^> >> %html%
echo	^</br^> >> %html%
	echo Общие ресурсы...
	set count=0
echo	^<table^> >> %html%
echo		^<caption^>^<h3^>Общие ресурсы^</h3^>^</caption^> >> %html%
echo		^<th^>Описание^</th^> >> %html%
echo		^<th^>Сетевое имя^</th^> >> %html%
echo		^<th^>Путь^</th^> >> %html%
	FOR /F "eol= usebackq skip=2 tokens=2* delims==" %%A IN (${'`'}wmic /LOCALE:MS_409 share get Description^, name^, path /VALUE${'`'}) DO CALL :Share %%A 
echo	^</table^> >> %html%
echo	^</br^> >> %html%
	echo Список установленых программ...
echo	^</br^> >> %html%
echo	^<p^>^<h3 class="list"^>Список установленых программ^</h3^>^</p^> >> %html%
echo 	^<script^> >> %html%
echo 		var soft=[  >> %html%
	for /f "usebackq delims=" %%Q in (${'`'}REG QUERY HKEY_USERS /s /k /c /f Uninstall ^| find "Windows\CurrentVersion\Uninstall"${'`'}) do CALL :GetReg %%Q
	for /f "usebackq delims=" %%Q in (${'`'}REG QUERY HKLM /s /k /c /f Uninstall ^| find "Windows\CurrentVersion\Uninstall"${'`'}) do CALL :GetReg %%Q
	for /f "usebackq delims=" %%Q in (${'`'}REG QUERY HKCU /s /k /c /f Uninstall ^| find "Windows\CurrentVersion\Uninstall"${'`'}) do CALL :GetReg %%Q
echo			];  >> %html%
 
echo 		var free=[  >> %html%
	for /F "delims=" %%I IN (%pathBat%\free.txt) DO echo "%%I", >> %html%
echo			];  >> %html%

echo 		var licence=[  >> %html%
	for /F "delims=" %%I IN (%pathBat%\Licence.txt) DO echo "%%I", >> %html%
echo			];  >> %html%

echo 		var ivc=[  >> %html%
	for /F "delims=" %%I IN (%pathBat%\IVC.txt) DO echo "%%I", >> %html%
echo			];  >> %html%

echo 		var services=[  >> %html%
	for /F "delims=" %%I IN (%pathBat%\services.txt) DO echo "%%I", >> %html%
echo			];  >> %html%

	for /F "delims=" %%I IN (%pathBat%\script.js) DO echo %%I >> %html%

echo	delScope("td"); >> %html%
echo 	^</script^> >> %html%
echo	^</br^> >> %html%

	echo Структура каталогов...
echo	^<h3 class="list"^>Структура каталогов (3 уровня)^</h3^> >> %html%
echo	^<ul class="list"^> >> %html%
	FOR /F "usebackq skip=1 delims= " %%i in (${'`'}wmic volume get caption${'`'}) DO CALL :one %%i
echo	^</ul^> >> %html%
echo	^</br^> >> %html%

echo ^</body^>  >> %html%
echo ^</html^>  >> %html%
	del %pathBat%\LIST_%COMPUTERNAME%.TXT
	del reestr_%COMPUTERNAME%.LIST
exit /B

:TestSMART
	if "%*"=="" exit /B
	if %count%==0 ( set model=%* & set count=1 & exit /B)
	if %count%==1 ( set status=%* & set count=0)
echo 		^<tr^> >> %html%
echo 			^<td^>%model:"=%^</td^> >> %html%
echo 			^<td^>%status:"=%^</td^> >> %html%
echo 		^</tr^> >> %html%
	exit /B
	
:RestorePoint
	if "%*"=="" exit /B
	set tmp=%*
	set result=Ошибка
	if "%tmp:~,1%"=="0" (set result=OK)
echo 		^<tr^> >> %html%
echo 			^<td^>%pointName%^</td^> >> %html%
echo 			^<td^>%result%^</td^> >> %html%
echo 		^</tr^> >> %html%
	exit /B	

:CheckFreespace
	if "%*"=="" exit /B
	if %count%==0 ( set capacity=%* & set count=1 & exit /B)
	if %count%==1 ( set caption=%* & set count=2 & exit /B)
	if %count%==2 ( set freespace=%* & set count=0)
	if "%caption:~0,1%"=="\" (exit /B)
	set /a freespacePercent=%freespace:~0,-6%*100/%capacity:~0,-6%
	
echo		^<tr^> >> %html%
echo			^<td^>%caption:"=%^</td^> >> %html%
echo			^<td class="gb"^>%capacity:"=%^</td^> >> %html%
echo			^<td class="gb"^>%freespace:"=%^</td^> >> %html%
echo			^<td^>%freespacePercent:"=%^</td^> >> %html%
echo		^</tr^> >> %html%
	exit /B


:GetReg
for /f "usebackq delims=" %%a in (${'`'}reg query "%*" /s ^| FIND "DisplayName"${'`'}) do CALL :GetProgram %%a

:GetProgram
	if "%*"=="@" exit /B
	set str=%*
	set strCSV=%str:    =;%
	set strCSV=%strCSV:"=%
	for /f "usebackq delims=; tokens=3*" %%B in (${'`'}echo 			"%strCSV%"${'`'}) do echo 		^"%%B,  >> %html%
	exit /B

:OSInfo
	if "%*"=="" exit /B
	if %count%==0 ( set caption=%* & set count=1 & exit /B)
	if %count%==1 ( set SystemDrive=%* & set count=0)
echo 		^<tr^> >> %html%
echo 			^<td^>^<b^>Система^</b^>^</td^> >> %html%
echo 			^<td^>%caption:"=%^</td^> >> %html%
echo 		^</tr^> >> %html%
echo 		^<tr^> >> %html%
echo 			^<td^>^<b^>Системный диск^</b^>^</td^> >> %html%
echo 			^<td^>%SystemDrive:"=%^</td^> >> %html%
echo 		^</tr^> >> %html%
	exit /B

:NetCart
	if %count%==0 ( set driver=%* & set count=1 & exit /B)
	if %count%==1 ( set name="%*" & set count=0)
	if "%driver:~0,2%" NEQ "%SystemDrive:~0,2%" exit /B
echo 		^<tr^> >> %html%
echo 			^<td^>^<b^>Сетевая карта^</b^>^</td^> >> %html%
echo 			^<td^>%name:"=%^</td^> >> %html%
echo 		^</tr^> >> %html%
	exit /B

:ProcInfo
	if "%*"=="" exit /B
	set proc=%*
echo 		^<tr^> >> %html%
echo 			^<td^>^<b^>Процессор^</b^>^</td^> >> %html%
echo 			^<td^>%proc:"=%^</td^> >> %html%
echo 		^</tr^> >> %html%
	exit /B

:BaseboardInfo
	if "%*"=="" exit /B
	set bb=%*
echo 		^<tr^> >> %html%
echo 			^<td^>^<b^>Материнская плата^</b^>^</td^> >> %html%
echo 			^<td^>%bb:"=%^</td^> >> %html%
echo 		^</tr^> >> %html%
	exit /B

:Printers
	if "%*"=="" exit /B.
	if %count:~0,1%==0 ( set default="%*" & set count=1 & exit /B)
	if %count:~0,1%==1 ( set DriverName="%*" & set count=2 & exit /B)
	if %count:~0,1%==2 ( set name="%*" & set count=3 & exit /B)
	if %count:~0,1%==3 ( set port="%*" & set count=0 )
echo		^<tr^> >> %html%
echo 			^<td^>%default:"=%^</td^> >> %html%
echo 			^<td^>%DriverName:"=%^</td^> >> %html%
echo 			^<td^>%name:"=%^</td^> >> %html%
echo 			^<td^>%port:"=%^</td^> >> %html%
echo 		^</tr^> >> %html%
	exit /B

:RAM
	if "%*"=="" exit /B
	if %count:~0,1%==0 ( set Capacity=%* & set count=1 & exit /B)
	if %count:~0,1%==1 ( set DeviceLocator=%* & set count=2 & exit /B)
	if %count:~0,1%==2 ( set Speed=%* & set count=0 )
echo		^<tr^> >> %html%
echo 			^<td class="gb"^>%Capacity:"=%^</td^> >> %html%
echo 			^<td^>%DeviceLocator:"=%^</td^> >> %html%
echo 			^<td^>%Speed:"=%^</td^> >> %html%
echo 		^</tr^> >> %html%
	exit /B

:Startup
	if %count:~0,1%==0 ( set Command="%*" & set count=1 & exit /B)
	if %count:~0,1%==1 ( set Description="%*" & set count=2 & exit /B)
	if %count:~0,1%==2 ( set Name="%*" & set count=0 )
echo		^<tr^> >> %html%
echo 			^<td^>%Name:"=%^</td^> >> %html%
echo 			^<td^>%Command:"=%^</td^> >> %html%
echo 			^<td^>%Description:"=%^</td^> >> %html%
echo 		^</tr^> >> %html%
	exit /B

:Jobs
	if %1=="Имя задачи" (set count=1)
	if %count%==1 (exit /B)
	set name=%1
	set state=%2
	set lastResult=%3
	set autor=%4
	set task=%5
echo		^<tr^> >> %html%
echo 			^<td^>%name:"=%^</td^> >> %html%
echo 			^<td^>%state:"=%^</td^> >> %html%
echo 			^<td^>%lastResult:"=%^</td^> >> %html%
echo 			^<td^>%autor:"=%^</td^> >> %html%
echo 			^<td^>%task:"=%^</td^> >> %html%
echo 		^</tr^> >> %html%
	exit /B

:Share
	if %count:~0,1%==0 ( set Description="%*" & set count=1 & exit /B)
	if %count:~0,1%==1 ( set Name="%*" & set count=2 & exit /B)
	if %count:~0,1%==2 ( set SharePath="%*" & set count=0 )
echo		^<tr^> >> %html%
echo 			^<td^>%Description:"=%^</td^> >> %html%
echo 			^<td^>%Name:"=%^</td^> >> %html%
echo 			^<td^>%SharePath:"=%^</td^> >> %html%
echo 		^</tr^> >> %html:"=%
	exit /B

rem Составление иерархии каталогов
:one
	if /I "%*"=="" (exit /B)
	set disk=%*
	echo	DISK %disk%
	if "%disk:~0,1%"=="\" (exit /B)
	set /a count=%count%+1
echo	^<li onclick="showProgList('list%count%')"^>%disk%^</li^> >> %html%
echo		^<ul id="list%count%" hidden^> >> %html%
	FOR /F "usebackq delims=" %%A in (${'`'}dir %disk% /AD /ON /B${'`'}) DO CALL :two %%A
echo		^</ul^> >> %html%
	exit /B

:two
	if /I "%*"=="$Recycle.Bin" (exit /B)
	if /I "%*"=="System Volume Information" (exit /B)
	if /I "%*"=="Documents and Settings" (exit /B)
	if /I "%*"=="" (exit /B)
	set p=%disk%"%*"
	set /a count=%count%+1
echo		^<li  onclick="showProgList('list%count%')"^>"%*"^</li^> >> %html%
echo			^<ul id="list%count%" hidden^> >> %html%
	FOR /F "usebackq delims=" %%B in (${'`'}dir %p% /AD /ON /B${'`'}) DO  if /I "%%B" NEQ "" (echo				^<li^>%%B^</li^> >> %html%)
echo			^</ul^> >> %html%	
	exit /B
`;