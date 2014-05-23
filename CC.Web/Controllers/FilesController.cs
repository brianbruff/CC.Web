using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Xml.Linq;
using CC.Web.Models;
using GdmxDiff.BL;
using Newtonsoft.Json;

namespace CC.Web.Controllers
{
    public class FilesController : ApiController
    {
        [HttpPost] 
        public async Task<HttpResponseMessage> Upload()
        {
            if (!Request.Content.IsMimeMultipartContent())
                this.Request.CreateResponse(HttpStatusCode.UnsupportedMediaType);
            
            var provider = GetMultipartProvider();
            var result = await Request.Content.ReadAsMultipartAsync(provider);

            var fileUploadObj = GetFormData<UploadData>(result);
            var originalFileName = GetDeserializedFileName(result.FileData.First());
            var path = Path.GetDirectoryName(result.FileData.First().LocalFileName);

            var file = Path.Combine(path, fileUploadObj.Side + ".xml");
            if (File.Exists(file))
                File.Delete(file);
            File.Move(result.FileData.First().LocalFileName, file);

//            File.Move(result.FileData.First().LocalFileName, 
//                Path.Combine(path, fileUploadObj.Side + "_" + originalFileName));

            var files = Directory.GetFiles(path);
            var left = files.FirstOrDefault(f => f.Contains("left.xml"));
            var right = files.FirstOrDefault(f => f.Contains("right.xml"));

            if (left != null && right != null)
            {
                var compare = new GdmxDiff.BL.GdmxCompare();
                List<ModelComparison> comparison = compare.Compare(XDocument.Load(left), XDocument.Load(right));
                var response = this.Request.CreateResponse(HttpStatusCode.OK, comparison);
                return response;
            }

            var placeholder = "prepared";
            return this.Request.CreateResponse(HttpStatusCode.OK, new { placeholder });
        }

        
        private MultipartFormDataStreamProvider GetMultipartProvider()
        {
            var uploadFolder = "~/App_Data/Tmp/FileUploads"; 
            var root = HttpContext.Current.Server.MapPath(uploadFolder);
            Directory.CreateDirectory(root);
            return new MultipartFormDataStreamProvider(root);
        }

        
        private T GetFormData<T>(MultipartFormDataStreamProvider result)
        {
            if (result.FormData.HasKeys())
            {
                var unescapedFormData = Uri.UnescapeDataString(result.FormData.GetValues(0).FirstOrDefault() ?? String.Empty);
                if (!String.IsNullOrEmpty(unescapedFormData))
                    return JsonConvert.DeserializeObject<T>(unescapedFormData);
            }

            return default(T);
        }

        private string GetDeserializedFileName(MultipartFileData fileData)
        {
            var fileName = GetFileName(fileData);
            return JsonConvert.DeserializeObject(fileName).ToString();
        }

        public string GetFileName(MultipartFileData fileData)
        {
            return fileData.Headers.ContentDisposition.FileName;
        }

    }

    
}
