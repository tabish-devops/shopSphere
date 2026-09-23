resource "aws_lb" "shopsphere" {
  name               = "shopsphere-alb"
  internal           = false
  load_balancer_type = "application"

  security_groups = [
    aws_security_group.alb.id
  ]

  subnets = [
    aws_subnet.public_az1.id,
    aws_subnet.public_az2.id
  ]

  enable_deletion_protection = false

  tags = {
    Name        = "shopsphere-alb"
    Project     = "ShopSphere"
    Environment = "production"
  }
}

resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.shopsphere.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.shopsphere.arn
  }
}
