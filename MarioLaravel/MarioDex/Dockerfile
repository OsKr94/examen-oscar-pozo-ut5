FROM php:8.2-cli

WORKDIR /app

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

# Copiar archivos del proyecto
COPY . .

# Instalar dependencias
RUN composer install --no-dev --optimize-autoloader

# Configurar permisos
RUN chmod -R 755 storage bootstrap/cache

# Exponer puerto
EXPOSE 8000

# Comando de inicio
CMD ["php", "-S", "0.0.0.0:8000", "-t", "public"]
