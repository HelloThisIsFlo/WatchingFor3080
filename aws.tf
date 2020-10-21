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
  acl = "public-read"
}
