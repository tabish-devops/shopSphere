# -----------------------------
# Public Route Table
# -----------------------------

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.shopsphere.id

  tags = {
    Name    = "shopsphere-public-rt"
    Project = "ShopSphere"
  }
}

resource "aws_route" "public_internet" {
  route_table_id         = aws_route_table.public.id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = aws_internet_gateway.shopsphere.id
}

# -----------------------------
# Private App Route Table AZ1
# -----------------------------

resource "aws_route_table" "private_app_az1" {
  vpc_id = aws_vpc.shopsphere.id

  tags = {
    Name    = "shopsphere-private-app-rt-az1"
    Project = "ShopSphere"
  }
}

resource "aws_route" "private_app_az1_nat" {
  route_table_id         = aws_route_table.private_app_az1.id
  destination_cidr_block = "0.0.0.0/0"
  nat_gateway_id         = aws_nat_gateway.az1.id
}

# -----------------------------
# Private App Route Table AZ2
# -----------------------------

resource "aws_route_table" "private_app_az2" {
  vpc_id = aws_vpc.shopsphere.id

  tags = {
    Name    = "shopsphere-private-app-rt-az2"
    Project = "ShopSphere"
  }
}

resource "aws_route" "private_app_az2_nat" {
  route_table_id         = aws_route_table.private_app_az2.id
  destination_cidr_block = "0.0.0.0/0"
  nat_gateway_id         = aws_nat_gateway.az2.id
}

# -----------------------------
# DB Route Table
# -----------------------------

resource "aws_route_table" "database" {
  vpc_id = aws_vpc.shopsphere.id

  tags = {
    Name    = "shopsphere-database-rt"
    Project = "ShopSphere"
  }
}

# -----------------------------
# Public Subnet Associations
# -----------------------------

resource "aws_route_table_association" "public_az1" {
  subnet_id      = aws_subnet.public_az1.id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "public_az2" {
  subnet_id      = aws_subnet.public_az2.id
  route_table_id = aws_route_table.public.id
}

# -----------------------------
# Private App Associations
# -----------------------------

resource "aws_route_table_association" "app_az1" {
  subnet_id      = aws_subnet.app_az1.id
  route_table_id = aws_route_table.private_app_az1.id
}

resource "aws_route_table_association" "app_az2" {
  subnet_id      = aws_subnet.app_az2.id
  route_table_id = aws_route_table.private_app_az2.id
}

# -----------------------------
# Database Associations
# -----------------------------

resource "aws_route_table_association" "db_az1" {
  subnet_id      = aws_subnet.db_az1.id
  route_table_id = aws_route_table.database.id
}

resource "aws_route_table_association" "db_az2" {
  subnet_id      = aws_subnet.db_az2.id
  route_table_id = aws_route_table.database.id
}
