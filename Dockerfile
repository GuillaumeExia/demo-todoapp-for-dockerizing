# Stage 1: Build Application
FROM maven:3.8.4-openjdk-17-slim AS builder

WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN mvn clean package

#Stage 2: Extract the built JAR
FROM openjdk:17-jdk-slim AS runner

WORKDIR /app

COPY --from=builder /app/target/todoapp-0.0.1-SNAPSHOT.jar app.jar

#Stage 3: Running the Application
FROM openjdk:17-jdk-alpine AS final

WORKDIR /app

COPY --from=runner /app/app.jar .

EXPOSE 8080

ENTRYPOINT [ "java", "-jar", "app.jar" ]
