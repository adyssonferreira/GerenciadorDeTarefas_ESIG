# ---------- ESTÁGIO 1: build ----------
FROM maven:3.9.8-eclipse-temurin-21 AS build
WORKDIR /app

COPY pom.xml .
# Baixa dependências sem compilar ainda (melhora o cache)
RUN mvn -B -q -e -DskipTests dependency:go-offline

COPY src ./src

# Compila e empacota (pula testes na imagem)
RUN mvn -B -q -e -DskipTests package


# ---------- ESTÁGIO 2: runtime ----------
FROM eclipse-temurin:21-jre
WORKDIR /app

# Copia o jar gerado do estágio anterior
COPY --from=build /app/target/*.jar app.jar

# Exponha a porta que sua app usa (8080 é o padrão)
EXPOSE 8080

# Healthcheck simples (ajuste a URL se necessário)
#HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
#  CMD wget -qO- http://localhost:8080/actuator/health || exit 1

# Ajuste a memória do JVM conforme necessidade (exemplo)
ENV JAVA_OPTS="-XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0"
ENV SPRING_PROFILES_ACTIVE=prod

# ENTRYPOINT/command
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]