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

resource "aws_instance" "example" {
  ami           = "ami-09b9e380df60300c8"
  instance_type = "t2.micro"
}
