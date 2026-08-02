FROM maven:3.9-eclipse-temurin-21 AS build

WORKDIR /app

COPY pom.xml ./
RUN mvn -B -ntp dependency:go-offline

COPY src ./src
RUN mvn -B -ntp -DskipTests package \
    && cp target/*.jar target/app.jar

FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=build --chown=1001:1001 /app/target/app.jar ./app.jar

USER 1001:1001

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/app.jar"]
