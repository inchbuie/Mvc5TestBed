using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Mvc5TestBed.MyMvcWebApp.Models
{
    public class ProfileImage
    {
        private byte[] _imageData;

        public byte[] ImageData
        {
            get { return _imageData; }
            set { _imageData = value; }
        }
    }
}