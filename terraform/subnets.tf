resource "aws_subnet" "public_az1" {
  vpc_id                  = aws_vpc.shopsphere.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "ap-south-1a"
  map_public_ip_on_launch = false

  tags = {
    Name = "shopsphere-public-az1"
  }
}

resource "aws_subnet" "public_az2" {
  vpc_id                  = aws_vpc.shopsphere.id
  cidr_block              = "10.0.2.0/24"
  availability_zone       = "ap-south-1b"
  map_public_ip_on_launch = false

  tags = {
    Name = "shopsphere-public-az2"
  }
}

resource "aws_subnet" "app_az1" {
  vpc_id            = aws_vpc.shopsphere.id
  cidr_block        = "10.0.11.0/24"
  availability_zone = "ap-south-1a"

  tags = {
    Name = "shopsphere-app-az1"
  }
}

resource "aws_subnet" "app_az2" {
  vpc_id            = aws_vpc.shopsphere.id
  cidr_block        = "10.0.12.0/24"
  availability_zone = "ap-south-1b"

  tags = {
    Name = "shopsphere-app-az2"
  }
}

resource "aws_subnet" "db_az1" {
  vpc_id            = aws_vpc.shopsphere.id
  cidr_block        = "10.0.21.0/24"
  availability_zone = "ap-south-1a"

  tags = {
    Name = "shopsphere-db-az1"
  }
}

resource "aws_subnet" "db_az2" {
  vpc_id            = aws_vpc.shopsphere.id
  cidr_block        = "10.0.22.0/24"
  availability_zone = "ap-south-1b"

  tags = {
    Name = "shopsphere-db-az2"
  }
}
