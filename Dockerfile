# Gunakan image Node.js sebagai base image
FROM node:18

# Tentukan direktori kerja di dalam container
WORKDIR /app

# Salin package.json dan package-lock.json ke dalam container
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin semua file sumber ke dalam container
COPY . .

# Build aplikasi TypeScript
RUN npm run build

# Tentukan port yang akan digunakan oleh aplikasi
EXPOSE 3000

# Jalankan aplikasi saat container dijalankan
CMD ["npm", "start"]
