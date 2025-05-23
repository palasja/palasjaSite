import freespace from './assets/code/freespace.png';
const Project = () => {
  return(
    <>
      <details>
        <summary>Readme</summary>
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

By default bat shoub be in D:\folder\. If it not the same, then path have to be change in all bat.
RUN_XML.bat
                pathBat=D:\folder- path to bat.
                UtilsDir=D:\folder - path to blat.exe.

CopyBak.bat (path to foldet with copy log)
                logDir=D:\folder

RuningProgram.bat (path to exe)
                Path1=D:\folder\file.exe
                Path2=D:\folder\file.exe
                Path3=D:\folder\file.exe

TCMError.bat (eroor log folder)
                TCMIn=d:\folder
                TCMOut=d:\folder

UnLoadFile.bat (path for input file)
                PathArea=d:\folder\
                PathRegional=d:\folder\
                PathRepublic=d:\folder\
                PathTCM=d:\folder\
                ТK=d:\folder\

Bak.bat (path to backup folder)
                PathBackups=d:\folder
ErrorLoadScan.bat (path to error folder)	
				set folder1=D:\folder\
				set folder2=D:\folder\
				set folder3=D:\folder\
				set folder4=D:\folder\
				set folder5=D:\folder\
				set folder6=D:\folder\	

				
</details>
<details>
  <summary>FreeSpace</summary>
    <img src={freespace}></img>
</details>
    </>
  );
}

export default Project;