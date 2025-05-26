import freespace from 'assets/code/freespace.png'
import style from './srvScan.module.css';
import { Bak, CheckTaskSync, ErrorLoadScan, FreeSpace, ProgError, Readme, RuningProgram, Unlodafile } from '../code_en';

const SrvScan = () => {
  return(
    <>
      <details>
        <summary>Readme</summary>
        {Readme}
{/* <p>RUN_XML.bat initial bat whitch create and send XML files. For sending it use account whitch running RUN_XML.
Without any params it run all 8.
For start separate bat there have to write their number as params whit whitespace.</p>
 <p>Example:"RUN_XML.bat 2 5" create xml whitch was backup info and running programs.</p>
 <ul>
  <li>1 - Run freeSpace.bat (freeSpace)</li>
  <li>2 - Run Bak.bat (Check created backups)</li>
  <li>3 - Run UnLoadFile.bat (unload files)</li>
  <li>4 - Run TCMError.bat (Scan errros)</li>
  <li>5 - Run RuningProgram.bat (chek prorrams is running)</li>
  <li>6 - Run ChekTaskSync.bat (last synchronization state)</li>
  <li>7 - Run TestCopyBak.bat (last backup copy)</li>
  <li>8 - Run ErrorLoadScan.bat (ErrorFiles)</li>
 </ul>

<p>To %fileLog% write log RUN_XML: params, start\end execute. </p>

<p>By default bat shoub be in D:\folder\. If it not the same, then path have to be change in all bat.
RUN_XML.bat</p>
<ul>
  <li>pathBat=D:\folder- path to bat.</li>
  <li>UtilsDir=D:\folder - path to blat.exe.</li>
</ul>
                
<p>CopyBak.bat (path to foldet with copy log)</p>
<ul>
  <li>logDir=D:\folder</li>
</ul>

<p>RuningProgram.bat (path to exe)</p>
<ul>
  <li>Path1=D:\folder\file.exe</li>
  <li>Path2=D:\folder\file.exe</li>
  <li>Path3=D:\folder\file.exe</li>
</ul>

<p>TCMError.bat (eroor log folder)</p>
<ul>
  <li>Path1=d:\folder</li>
  <li>Path2=d:\folder</li>
</ul>

<p>UnLoadFile.bat (path for input file)</p>
                
                
                
                
                
<ul>
  <li>Path1=d:\folder\</li>
  <li>Path2=d:\folder\</li>
    <li>Path3=d:\folder\</li>
  <li>Path4=d:\folder\</li>
    <li>Path5=d:\folder\</li>
</ul>
<p>Bak.bat (path to backup folder)</p>
                <ul>
  <li>PathBackups=d:\folder</li>
</ul>
<p>ErrorLoadScan.bat (path to error folder)	</p>
<ul>
  <li>set folder1=D:\folder\</li>
  <li>set folder2=D:\folder\</li>
    <li>set folder3=D:\folder\</li>
  <li>set folder4=D:\folder\</li>
    <li>set folder5=D:\folder\</li>
  <li>set folder6=D:\folder\</li>
</ul> */}
				
</details>
<details>
  <summary>FreeSpace</summary>
<pre>
 {FreeSpace}
</pre>
</details>
<details>
  <summary>Unlodafile</summary>
<pre>
 {Unlodafile}
</pre>
</details>
<details>
  <summary>Bak</summary>
<pre>
 {Bak}
</pre>
</details>
<details>
  <summary>CheckTaskSync</summary>
<pre>
 {CheckTaskSync}
</pre>
</details>
<details>
  <summary>ErrorLoadScan</summary>
<pre>
 {ErrorLoadScan}
</pre>
</details>
<details>
  <summary>RuningProgram</summary>
<pre>
 {RuningProgram}
</pre>
</details>
<details>
  <summary>ProgError</summary>
<pre>
 {ProgError}
</pre>
</details>
    </>
  );
}

export default SrvScan;