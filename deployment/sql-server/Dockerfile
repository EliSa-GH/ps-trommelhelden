FROM mcr.microsoft.com/mssql/server:2019-latest

ENV SA_PASSWORD Trommelhelden24!
ENV ACCEPT_EULA Y
ENV MSSQL_PID Express

EXPOSE 1433

RUN mkdir -p /usr/work
COPY *.sql /usr/work/

WORKDIR /usr/work

RUN ( /opt/mssql/bin/sqlservr & ) \
    | grep -q "Service Broker manager has started" \
    && /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P Trommelhelden24! -i 1_schema.sql \
	&& /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P Trommelhelden24! -i 2_ersatzteil.sql \
	&& /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P Trommelhelden24! -i 3_kunde.sql \
	&& /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P Trommelhelden24! -i 4_mitarbeiter.sql \
	&& /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P Trommelhelden24! -i 5_auftrag.sql \
	&& /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P Trommelhelden24! -i 6_montage.sql \
	&& /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P Trommelhelden24! -i 7_trigger.sql \
	&& /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P Trommelhelden24! -i 8_aufnr_trigger.sql \
	&& /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P Trommelhelden24! -i 9_kunnr_trigger.sql \
    && pkill sqlservr