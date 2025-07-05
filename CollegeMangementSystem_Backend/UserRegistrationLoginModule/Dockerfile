FROM amazoncorretto:17-alpine

# jar is getting copied from project target directory to default location
COPY target/collegemanagementapp-backend.jar /usr/app/

WORKDIR /usr/app

EXPOSE 8001

ENTRYPOINT ["java", "-jar", "collegemanagementapp-backend.jar"]