FROM php:8.2-cli

WORKDIR /app

# Dependencias del sistema y extensiones PHP necesarias para Laravel
RUN apt-get update && apt-get install -y \
	git \
	unzip \
	libonig-dev \
	libxml2-dev \
	sqlite3 \
	libsqlite3-dev \
	&& docker-php-ext-install pdo pdo_sqlite mbstring bcmath \
	&& rm -rf /var/lib/apt/lists/*

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

# Copiar archivos del proyecto
COPY . .

# Instalar dependencias
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Configurar permisos
RUN mkdir -p database \
	&& touch database/database.sqlite \
	&& chmod -R 775 storage bootstrap/cache database

# Exponer puerto
EXPOSE 8000

# Comando de inicio
CMD sh -c "php artisan migrate --force && php -S 0.0.0.0:${PORT:-8000} -t public"
