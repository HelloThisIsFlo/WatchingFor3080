terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 2.70"
    }
  }
}

provider "aws" {
  profile = "private-admin"
  region  = "eu-west-1"
}

resource "aws_s3_bucket" "bucket" {
  bucket = "watch-for-3080"
  acl    = "public-read"
  policy = <<POLICY
{
  "Id": "AllowWriteFor_WatchFor3080_User",
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowWrite",
      "Action": ["s3:PutObject", "s3:PutObjectAcl"],
      "Effect": "Allow",
      "Resource": "arn:aws:s3:::watch-for-3080/*",
      "Principal": {
        "AWS": ["arn:aws:iam::193208114745:user/WatchFor3080"]
      }
    }
  ]
}
POLICY
}
