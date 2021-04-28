<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Site;
use ZipArchive;

class SitesController extends Controller
{
    public function index(){
    	$site = Site::all();
    	return $site;
    }

    public function show($site_id){
    	$site = Site::where('site_id', $site_id);
    	return $site;
    	#check if current site_id matchs the one in the database and if so, we return the site
    }

    public function store(Request $request){
        
        Site::create($request->all());
    	return response()->json([
    	    'message' => 'Success'
    	    ]);
    }

    public function edit(Request $request,$site_id){
    	$site = Site::find($site_id);
    	$site->update($request->all());
    	$site->save();
    	return;
    }

    public function destroy($site_id){
    	$site = Site::find($site_id);
    	$site->delete();
    	return;
    }

    //TODO: Combine with store()
    public function uploadSite(Request $request) {
        //TODO: Move ZIP file to sites folder to be extracted
//        $data = array();
//        if($request->file) {
//            $error = false;
//            $files = array();
//
//            $siteDir = 'C:\xampp\htdocs\safetynet\public\sites';
//        }   foreach ($_FILES as $file) {
//            if(move_uploaded_file($file[]))
//        }

    }

    private function unzipSite($pathToZip) {
        $file = $pathToZip;
        $zip = new ZipArchive;
        $zipped = $zip->open($file);
        $path = pathinfo(realpath($file), PATHINFO_DIRNAME);

        if($zipped) {
            $extract = $zip->extractTo($path);
            if ($extract) {
                //TODO: Create a .htaccess file for directory to protect it

                return response()->json([
                   "message" => \Message::$siteMessages['SiteUploadSuccess']
                ]);
            } else {
                return response()->json([
                    "message" => \Message::$siteMessages['SiteUploadSuccess']
                ]);
            }
        } else {
            return response()->json([
                "message" => \Message::$siteMessages['SiteUploadSuccess']
            ]);
        }
    }
}
