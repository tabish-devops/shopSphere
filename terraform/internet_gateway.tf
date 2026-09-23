resource "aws_internet_gateway" "shopsphere" {
  vpc_id = aws_vpc.shopsphere.id

  tags = {
    Name    = "shopsphere-igw"
    Project = "ShopSphere"
  }
}
