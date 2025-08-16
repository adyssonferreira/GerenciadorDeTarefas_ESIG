# ---------- ESTÁGIO 1: build ----------
FROM maven:3.9.8-eclipse-temurin-21 AS build
WORKDIR /app

COPY pom.xml .
RUN mvn -B -q -e -DskipTests dependency:go-offline

COPY src ./src

RUN mvn -B -q -e -DskipTests package


# ---------- ESTÁGIO 2: runtime ----------
FROM eclipse-temurin:21-jre
WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

# Healthcheck simples (ajuste a URL se necessário)
#HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
#  CMD wget -qO- http://localhost:8080/actuator/health || exit 1

ENV JAVA_OPTS="-XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0"
ENV SPRING_PROFILES_ACTIVE=prod

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]