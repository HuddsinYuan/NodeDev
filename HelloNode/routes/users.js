var express = require('express');
var router = express.Router();

var ffi = require(__dirname + '\\..\\node_modules\\ffi');
var ref = require('ref');

var Struct = require("ref-struct");
var arrayType = require("ref-array");

/**
* A map between Windows and C types.
* https://msdn.microsoft.com/en-us/library/windows/desktop/aa383751%28v=vs.85%29.aspx
*/

var windows={}

windows.types = {
    "BOOL":   "int",
    "INT":    "int",
    "UINT":   "uint",
    "ULONG":  "ulong",
    "DWORD":  "ulong",
    "HKL":    "void*",
    "ULONG_PTR": "ulong",
    "LONG":   "long",
    "HANDLE": "uint32",
    "WORD":   "uint16",
    "TCHAR":  "uint16"  // assuming unicode. (ASCII is char, UNICODE is WCHAR -&gt; wchar_t -&gt; unsigned short === UINT16 === uint16
};

var t = windows.types;
// https://msdn.microsoft.com/en-us/library/windows/desktop/dd183565(v=vs.85).aspx

var CCHDEVICENAME = 32;
var CCHFORMNAME = 32;

windows.DEVMODEW = new Struct([
    [arrayType(t.TCHAR, CCHDEVICENAME), "dmDeviceName"],
    [t.WORD, "dmSpecVersion"],
    [t.WORD, "dmDriverVersion"],
    [t.WORD, "dmSize"],
    [t.WORD, "dmDriverExtra"],
    [t.DWORD, "dmFields"],

    ["short", "dmOrientation"],
    ["short", "dmPaperSize"],
    ["short", "dmPaperLength"],
    ["short", "dmPaperWidth"],
    ["short", "dmScale"],
    ["short", "dmCopies"],
    ["short", "dmDefaultSource"],
    ["short", "dmPrintQuality"],

    ["short", "dmColor"],
    ["short", "dmDuplex"],
    ["short", "dmYResolution"],
    ["short", "dmTTOption"],
    ["short", "dmCollate"],
    [arrayType(t.TCHAR, CCHFORMNAME), "dmFormName"],
    [t.WORD, "dmLogPixels"],
    [t.DWORD, "dmBitsPerPel"],
    [t.DWORD, "dmPelsWidth"],
    [t.DWORD, "dmPelsHeight"],
    //union {
        [t.DWORD,"dmDisplayFlags"],
    //  DWORD dmNup;
    //};
    [t.DWORD, "dmDisplayFrequency"],
    //#if (WINVER &gt;= 0x0400)
    [t.DWORD, "dmICMMethod"],
    [t.DWORD, "dmICMIntent"],
    [t.DWORD, "dmMediaType"],
    [t.DWORD, "dmDitherType"],
    [t.DWORD, "dmReserved1"],
    [t.DWORD, "dmReserved2"],
    //#if (WINVER &gt;= 0x0500) || (_WIN32_WINNT &gt;= 0x0400)
    [t.DWORD, "dmPanningWidth"],
    [t.DWORD, "dmPanningHeight"]
    //#endif
    //#endif
]);

var winapi = {};
winapi.void = ref.types.void;
winapi.PVOID = ref.refType(winapi.void);
winapi.HANDLE = winapi.PVOID;
winapi.HWND = winapi.HANDLE;
winapi.WCHAR = ref.types.char;
winapi.LPCWSTR = ref.types.CString;
winapi.UINT = ref.types.uint;

windows.user32 = ffi.Library("user32", {
    // https://msdn.microsoft.com/en-us/library/windows/desktop/dd162611(v=vs.85).aspx
    // LPCWSTR, DWORD, DEVMODE*
    "EnumDisplaySettingsW": [
        t.BOOL, ["pointer", t.DWORD, "pointer"]
    ],
    "MessageBoxW": [
        'int', [ winapi.HWND, winapi.LPCWSTR, winapi.LPCWSTR, winapi.UINT ] 
    ]
    
});

/**
 *  Gets the current screen resolution
 *
 * @return {Object) The width and height of the screen.
 */
windows.getScreenResolution = function () {
    var dm = new windows.DEVMODEW();
    dm.ref().fill(0);
    dm.dmSize = windows.DEVMODEW.size;

    if (c.FALSE != windows.user32.EnumDisplaySettingsW(ref.NULL, c.ENUM_CURRENT_SETTINGS, dm.ref()))
    {
        // note for unknown reason on win 10 the returned dmSize is 188 not expected 220
        return { width: dm.dmPelsWidth, height: dm.dmPelsHeight };
    }
    return { width: 0, height: 0 };

}



var libmydll = new ffi.Library(__dirname + '\\..\\myDLL\\myDLL.dll', {
  'add':['int', ['int','int']]
});


// TODO this will cause the err 193.
// var libuser = new ffi.Library(__dirname + '\\..\\myDLL\\user32.dll', {
//   'MessageBoxW': 
//    [
//       'int32', [ 'int32', 'string', 'string', 'int32' ]
//    ]
// });


var tempans=libmydll.add(5,7);
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/test', function(req, res, next) {
  res.send("get here ");
  console.log("var tempans=libmydll.add(5,7);");
  console.log("tempans = " + tempans);  
  windows.user32.MessageBox(0, "sss", "sss", 0);
});

module.exports = router;
