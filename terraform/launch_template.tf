data "aws_ami" "ubuntu" {
  most_recent = true

  owners = ["099720109477"]

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd-gp3/ubuntu-noble-24.04-amd64-server-*"]
  }

  filter {
    name   = "architecture"
    values = ["x86_64"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

resource "aws_launch_template" "shopsphere" {
  name_prefix   = "shopsphere-app-"
  image_id      = data.aws_ami.ubuntu.id
  instance_type = "t3.micro"
  key_name      = "my-bouqet"

  vpc_security_group_ids = [
    aws_security_group.app.id
  ]

  user_data = base64encode(<<-EOF
    #!/bin/bash

    apt-get update -y
    apt-get install -y nginx curl

    systemctl enable nginx
    systemctl start nginx

    echo "ShopSphere Application Server" > /var/www/html/index.html
  EOF
  )

  tag_specifications {
    resource_type = "instance"

    tags = {
      Name        = "shopsphere-app-server"
      Project     = "ShopSphere"
      Environment = "production"
    }
  }

  lifecycle {
    create_before_destroy = true
  }
}
