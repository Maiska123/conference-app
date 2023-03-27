FROM mcr.microsoft.com/mssql/server:2019-latest

ENV MSSQL_SA_PASSWORD=admiN_123
ENV ACCEPT_EULA=Y
ENV MSSQL_PID Express

RUN mkdir /var/opt/mssql/data

WORKDIR /usr/src/app

COPY create-database.sql .
COPY fill-database.sql .

EXPOSE 1433

CMD /opt/mssql/bin/sqlservr & sleep 60s \
  && /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P ${MSSQL_SA_PASSWORD} -i create-database.sql \
  && /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P ${MSSQL_SA_PASSWORD} -i fill-database.sql \
  && tail -f /dev/null
