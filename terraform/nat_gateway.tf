resource "aws_eip" "nat_az1" {
  domain = "vpc"

  tags = {
    Name    = "shopsphere-nat-eip-az1"
    Project = "ShopSphere"
  }
}

resource "aws_eip" "nat_az2" {
  domain = "vpc"

  tags = {
    Name    = "shopsphere-nat-eip-az2"
    Project = "ShopSphere"
  }
}

resource "aws_nat_gateway" "az1" {
  allocation_id = aws_eip.nat_az1.id
  subnet_id     = aws_subnet.public_az1.id

  tags = {
    Name    = "shopsphere-nat-az1"
    Project = "ShopSphere"
  }

  depends_on = [
    aws_internet_gateway.shopsphere
  ]
}

resource "aws_nat_gateway" "az2" {
  allocation_id = aws_eip.nat_az2.id
  subnet_id     = aws_subnet.public_az2.id

  tags = {
    Name    = "shopsphere-nat-az2"
    Project = "ShopSphere"
  }

  depends_on = [
    aws_internet_gateway.shopsphere
  ]
}
