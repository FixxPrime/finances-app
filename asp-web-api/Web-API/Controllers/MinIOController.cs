using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Mvc;
using Minio;
using Minio.DataModel.Args;
using Newtonsoft.Json;

namespace Web_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MinIOController : Controller
    {
        private readonly IMinioClient _minioClient;

        public MinIOController(IMinioClient minioClient)
        {
            _minioClient = minioClient;
        }

        [HttpGet]
        [Route("icon/{name}")]
        public async Task<IActionResult> GetPresignedObject([FromRoute] string name)
        {
            string bucketName = "application";
            string objectName = "icons/" + name + ".svg";

            var reqParams = new Dictionary<string, string>(StringComparer.Ordinal)
            {
                { "image/svg", "application/json" }
            };
            var args = new PresignedGetObjectArgs()
                .WithBucket(bucketName)
                .WithObject(objectName)
                .WithExpiry(900)
                .WithHeaders(reqParams);
            var presignedUrl = await _minioClient.PresignedGetObjectAsync(args).ConfigureAwait(false);

            return Ok(JsonConvert.SerializeObject(presignedUrl));
        }

        [HttpGet]
        [Route("list")]
        public async Task<IActionResult> GetUrl()
        {
            var getListBucketsTask = await _minioClient.ListBucketsAsync();

            return Json(getListBucketsTask);
        }


        //[HttpPost]
        //[Route("create")]
        //public async Task<IActionResult> CreateBuck()
        //{
        //    await _minioClient.MakeBucketAsync(
        //        new MakeBucketArgs()
        //            .WithBucket("test")
        //            .WithLocation("us-east-1"));

        //    return Ok();
        //}


        //[HttpGet]
        //[Route("files")]
        //public async Task<IActionResult> GetFilesBucket()
        //{
        //    string bucketName = "application";
        //    string prefix = null;
        //    bool recursive = true;

        //    try
        //    {
        //        var listArgs = new ListObjectsArgs()
        //            .WithBucket(bucketName)
        //            .WithPrefix(prefix)
        //            .WithRecursive(recursive);
        //        var observable = _minioClient.ListObjectsAsync(listArgs);
        //        var subscription = observable.Subscribe(
        //            item => Console.WriteLine($"Object: {item.Key}"),
        //            ex => Console.WriteLine($"OnError: {ex}"),
        //            () => Console.WriteLine($"Listed all objects in bucket {bucketName}\n"));
        //    }
        //    catch (Exception e)
        //    {
        //        Console.WriteLine($"[Bucket]  Exception: {e}");
        //    }

        //    return Ok();
        //}
    }
}
