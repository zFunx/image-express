## What is it?

Simple image optimization server that efficiently resizes and converts images to high-quality, modern formats such as AVIF for improved website performance

## Installation

Fork and deploy on [Vercel](https://vercel.com/)

## Usage

Get the optimized images from the following GET request

```
your-domain.com/ie/{url-of-image}?width={width-of-image}&format={format-of-image}
```

Default width is 368px and format is AVIF

## Further Optimization

You can add [Cloudflare](https://www.cloudflare.com/) like services between your origin and clients to cache optimized images

## Limitations

1. Limited options
1. Can't convert large images to given image format (like AVIF). You have to send smaller width param as Vercel's serverless functions run for 5sec only
1. This project has less stars 🤔
