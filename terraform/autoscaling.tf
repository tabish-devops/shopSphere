resource "aws_autoscaling_group" "shopsphere" {
  name = "shopsphere-asg"

  min_size         = 2
  desired_capacity = 2
  max_size         = 4

  vpc_zone_identifier = [
    aws_subnet.app_az1.id,
    aws_subnet.app_az2.id
  ]

  target_group_arns = [
    aws_lb_target_group.shopsphere.arn
  ]

  health_check_type         = "ELB"
  health_check_grace_period = 120

  launch_template {
    id      = aws_launch_template.shopsphere.id
    version = "$Latest"
  }

  tag {
    key                 = "Name"
    value               = "shopsphere-app-server"
    propagate_at_launch = true
  }

  tag {
    key                 = "Project"
    value               = "ShopSphere"
    propagate_at_launch = true
  }

  tag {
    key                 = "Environment"
    value               = "production"
    propagate_at_launch = true
  }

  lifecycle {
    create_before_destroy = true
  }
}
