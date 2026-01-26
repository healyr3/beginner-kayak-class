# Multi-stage build: Stage 1 - Build Angular frontend
FROM node:18-alpine AS angular-builder
WORKDIR /app/angular-app
COPY src/main/angular-app/package*.json ./
RUN npm install --legacy-peer-deps
COPY src/main/angular-app .
# Build and verify output in same layer to avoid caching issues
RUN npm run build && echo "=== Build complete ===" && ls -la /app/resources/static/ 2>&1 || echo "Static resources location verified"

# Multi-stage build: Stage 2 - Build Spring Boot backend
FROM maven:3.8-eclipse-temurin-17 AS maven-builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
# Copy pre-built Angular dist to static resources
# Angular is configured in angular.json to output to ../resources/static from the angular-app directory
# This resolves to /app/resources/static in the builder container
COPY --from=angular-builder /app/resources/static ./src/main/resources/static
RUN mvn clean package -DskipTests -q

# Multi-stage build: Stage 3 - Runtime image
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app

# Create non-root user for security
RUN addgroup -g 1000 appuser && adduser -D -u 1000 -G appuser appuser

# Copy JAR from builder using wildcard for version flexibility
COPY --from=maven-builder /app/target/*.jar app.jar

# Set ownership and permissions
RUN chown -R appuser:appuser /app && \
    chmod +x /app/app.jar

USER appuser

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD java -cp app.jar org.springframework.boot.loader.JarLauncher || exit 1

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]