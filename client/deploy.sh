#! /bin/bash

npm run build
cp vercel.json build/
vercel --prod
vercel