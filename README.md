# Watch for 3080

Fighting Scalpers

## What does it do?

This project watches the nvidia stores for visual differences and notifies via a discord webhook with:

- Name of the store
- Link to the store
- Snapshot showing what just changed on the website

It does not purchase a card automatically, it only allows normal people (aka non-bots) to be notified as soon as possible to then try and place a manual order.

## Does it work?

![Nvidia 3080](https://github.com/FlorianKempenich/WatchingFor3080/raw/master/3080.jpeg)

## Deploy

### AWS

- Create IAM User and put its `ARN` in `aws.tf` as `Principal` (on the bucket policy)
- Run `terraform apply`

### Start

- Create a config file `./.env`

  ```shell
  AWS_ACCESS_KEY_ID=......
  AWS_SECRET_ACCESS_KEY=......
  AWS_DEFAULT_REGION=......
  DISCORD_WEBHOOK_URL=......
  ```

- Run `./script/docker_start.sh`
