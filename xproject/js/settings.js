function SetMissingValues(){
// Set Missing localStorage
if(LS.xmbcolor==null){LS.xmbcolor='goldenrod';}
if(LS.KernEpoch==null){LS.KernEpoch='0';}
if(LS.KernClock==null){LS.KernClock='ON';}
if(LS.UserName==null){LS.UserName='user';}
if(LS.UserIP==null){LS.UserIP='NotSet';}
if(LS.WelcomePop==null){LS.WelcomePop='ON';}

if(LS.Combo1NUM==null){LS.Combo1NUM='001';}
if(LS.Combo1A==null){LS.Combo1A='GoldHEN v2.2.2';}
if(LS.Combo1B==null){LS.Combo1B='GoldHEN222.html';}

if(LS.Combo2NUM==null){LS.Combo2NUM='58';}
if(LS.Combo2A==null){LS.Combo2A='FTP + FULL R/W';}
if(LS.Combo2B==null){LS.Combo2B='ftprw.html';}

if(LS.Combo3NUM==null){LS.Combo3NUM='39';}
if(LS.Combo3A==null){LS.Combo3A='FW SPOOFER';}
if(LS.Combo3B==null){LS.Combo3B='fwspoof.html';}

if(LS.Combo4NUM==null){LS.Combo4NUM='61';}
if(LS.Combo4A==null){LS.Combo4A='REACTPSPLUS-MOD';}
if(LS.Combo4B==null){LS.Combo4B='reactmod.html';}

 if(LS.Quick1NUM==null){LS.Quick1NUM='001';}
if(LS.Quick1A==null){LS.Quick1A='GoldHEN 2.3';}
if(LS.Quick1B==null){LS.Quick1B='GoldHEN23.html';}
if(LS.Quick1C==null){LS.Quick1C='Added cheat absolute offset support, Fixed close option bug, Fixed Orbis Toolbox support bug ';}
if(LS.Quick1D==null){LS.Quick1D='2.3 by SiSTRo/Joonie86';}
if(LS.Quick1E==null){LS.Quick1E='0xe898';}
  
if(LS.Quick2NUM==null){LS.Quick2NUM='002';}
if(LS.Quick2A==null){LS.Quick2A='GoldHEN 2.2.4';}
if(LS.Quick2B==null){LS.Quick2B='GoldHEN224.html';}
if(LS.Quick2C==null){LS.Quick2C='Added cheat absolute offset support, Fixed close option bug, Fixed Orbis Toolbox support bug ';}
if(LS.Quick2D==null){LS.Quick2D='2.2.4 by SiSTRo/Joonie86';}
if(LS.Quick2E==null){LS.Quick2E='0xe898';}

if(LS.Quick3NUM==null){LS.Quick3NUM='48';}
if(LS.Quick3A==null){LS.Quick3A='BINLOADER';}
if(LS.Quick3B==null){LS.Quick3B='binloader.html';}
if(LS.Quick3C==null){LS.Quick3C='Send bin format payloads to port:9020';}
if(LS.Quick3D==null){LS.Quick3D='1.0 by Specter';}
if(LS.Quick3E==null){LS.Quick3E='0xe163';}

if(LS.Quick4NUM==null){LS.Quick4NUM='29';}
if(LS.Quick4A==null){LS.Quick4A='GAME DUMPER';}
if(LS.Quick4B==null){LS.Quick4B='vtxdump.html';}
if(LS.Quick4C==null){LS.Quick4C='Dump disc/PSN games to USB: with/without patches, merged/unmerged';}
if(LS.Quick4D==null){LS.Quick4D='1.8 by xVortex';}
if(LS.Quick4E==null){LS.Quick4E='0xe149';}

// Set Missing Cookies
if (RC('xmbcolor')==null){CC('xmbcolor',LS.xmbcolor,365);}
if (RC('KernEpoch')==null){CC('KernEpoch',LS.KernEpoch,365);}
if (RC('KernClock')==null){CC('KernClock',LS.KernClock,365);}
if (RC('UserName')==null){CC('UserName',LS.UserName,365);}
if (RC('UserIP')==null){CC('UserIP',LS.UserIP,365);}
if (RC('WelcomePop')==null){CC('WelcomePop',LS.WelcomePop,365);}
if (RC('Combo1NUM')==null){CC('Combo1NUM',LS.Combo1NUM,365);} if (RC('Combo1A')==null)  {CC('Combo1A',LS.Combo1A,365);} if (RC('Combo1B')==null)  {CC('Combo1B',LS.Combo1B,365);}
if (RC('Combo2NUM')==null){CC('Combo2NUM',LS.Combo2NUM,365);} if (RC('Combo2A')==null)  {CC('Combo2A',LS.Combo2A,365);} if (RC('Combo2B')==null)  {CC('Combo2B',LS.Combo2B,365);}
if (RC('Combo3NUM')==null){CC('Combo3NUM',LS.Combo3NUM,365);} if (RC('Combo3A')==null)  {CC('Combo3A',LS.Combo3A,365);} if (RC('Combo3B')==null)  {CC('Combo3B',LS.Combo3B,365);}
if (RC('Combo4NUM')==null){CC('Combo4NUM',LS.Combo4NUM,365);} if (RC('Combo4A')==null)  {CC('Combo4A',LS.Combo4A,365);} if (RC('Combo4B')==null)  {CC('Combo4B',LS.Combo4B,365);}
if (RC('Quick1NUM')==null){CC('Quick1NUM',LS.Quick1NUM,365);} if (RC('Quick1A')==null)  {CC('Quick1A',LS.Quick1A,365);} if (RC('Quick1B')==null)  {CC('Quick1B',LS.Quick1B,365);} if (RC('Quick1C')==null)  {CC('Quick1C',LS.Quick1C,365);} if (RC('Quick1D')==null)  {CC('Quick1D',LS.Quick1D,365);} if (RC('Quick1E')==null)  {CC('Quick1E',LS.Quick1E,365);}
if (RC('Quick2NUM')==null){CC('Quick2NUM',LS.Quick2NUM,365);} if (RC('Quick2A')==null)  {CC('Quick2A',LS.Quick2A,365);} if (RC('Quick2B')==null)  {CC('Quick2B',LS.Quick2B,365);} if (RC('Quick2C')==null)  {CC('Quick2C',LS.Quick2C,365);} if (RC('Quick2D')==null)  {CC('Quick2D',LS.Quick2D,365);} if (RC('Quick2E')==null)  {CC('Quick2E',LS.Quick2E,365);}
if (RC('Quick3NUM')==null){CC('Quick3NUM',LS.Quick3NUM,365);} if (RC('Quick3A')==null)  {CC('Quick3A',LS.Quick3A,365);} if (RC('Quick3B')==null)  {CC('Quick3B',LS.Quick3B,365);} if (RC('Quick3C')==null)  {CC('Quick3C',LS.Quick3C,365);} if (RC('Quick3D')==null)  {CC('Quick3D',LS.Quick3D,365);} if (RC('Quick3E')==null)  {CC('Quick3E',LS.Quick3E,365);}
if (RC('Quick4NUM')==null){CC('Quick4NUM',LS.Quick4NUM,365);} if (RC('Quick4A')==null)  {CC('Quick4A',LS.Quick4A,365);} if (RC('Quick4B')==null)  {CC('Quick4B',LS.Quick4B,365);} if (RC('Quick4C')==null)  {CC('Quick4C',LS.Quick4C,365);} if (RC('Quick4D')==null)  {CC('Quick4D',LS.Quick4D,365);} if (RC('Quick4E')==null)  {CC('Quick4E',LS.Quick4E,365);}
}
SetMissingValues();

// Set OnUnload Items
window.onunload=function(e){
CC("BGimage",LS.BGimage,365);
CC("xmbcolor",LS.xmbcolor,365);
CC("KernEpoch",LS.KernEpoch,365);
CC("KernClock",LS.KernClock,365);
CC("UserName",LS.UserName,365);
CC("UserIP",LS.UserIP,365);
CC("WelcomePop",LS.WelcomePop,365);
CC("Combo1NUM",LS.Combo1NUM,365); CC("Combo1A",LS.Combo1A,365); CC("Combo1B",LS.Combo1B,365);
CC("Combo2NUM",LS.Combo2NUM,365); CC("Combo2A",LS.Combo2A,365); CC("Combo2B",LS.Combo2B,365);
CC("Combo3NUM",LS.Combo3NUM,365); CC("Combo3A",LS.Combo3A,365); CC("Combo3B",LS.Combo3B,365);
CC("Combo4NUM",LS.Combo4NUM,365); CC("Combo4A",LS.Combo4A,365); CC("Combo4B",LS.Combo4B,365);
CC("Quick1NUM",LS.Quick1NUM,365); CC("Quick1A",LS.Quick1A,365); CC("Quick1B",LS.Quick1B,365); CC("Quick1C",LS.Quick1C,365); CC("Quick1D",LS.Quick1D,365); CC("Quick1E",LS.Quick1E,365);
CC("Quick2NUM",LS.Quick2NUM,365); CC("Quick2A",LS.Quick2A,365); CC("Quick2B",LS.Quick2B,365); CC("Quick2C",LS.Quick2C,365); CC("Quick2D",LS.Quick2D,365); CC("Quick2E",LS.Quick2E,365);
CC("Quick3NUM",LS.Quick3NUM,365); CC("Quick3A",LS.Quick3A,365); CC("Quick3B",LS.Quick3B,365); CC("Quick3C",LS.Quick3C,365); CC("Quick3D",LS.Quick3D,365); CC("Quick3E",LS.Quick3E,365);
CC("Quick4NUM",LS.Quick4NUM,365); CC("Quick4A",LS.Quick4A,365); CC("Quick4B",LS.Quick4B,365); CC("Quick4C",LS.Quick4C,365); CC("Quick4D",LS.Quick4D,365); CC("Quick4E",LS.Quick4E,365);
};
