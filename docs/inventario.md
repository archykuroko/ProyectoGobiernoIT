
## Relaci�n de procesos

|  |  |  |  |
| --- | --- | --- | --- |
| **Elementos** | **Proceso 1** | **Proceso 2** | **Proceso 3** |
| **Id. De**  **proceso** | VM-PROC1 | VM-PROC2 | VM-PROC3 |
| **Nombre del**  **proceso** | Identificaci�n y escaneo  de activos | An�lisis, priorizaci�n y  direccionamiento | Remediaci�n y  seguimientos de SLA |
| **Descripci�n** | 1. Descubrimiento: Escaneo continuo de la red para mapear infraestructura f�sica, servidores, VMs y nube. 2. Registro e Inventario: Actualizaci�n del inventario para evitar puntos ciegos. 3. Integraci�n de Repositorios: Conexi�n directa con repositorios de c�digo para revisar fallos de dise�o. 4. Ejecuci�n de Escaneos: Revisiones peri�dicas   automatizadas (puertos, software, etc.).   1. Identificaci�n de Vectores: Detecci�n de fallos que exponen la tr�ada CIA. 2. Consolidaci�n de Hallazgos: Centralizaci�n de datos autom�ticos y manuales (pentesting). | Ingesta de Datos: Recepci�n de los resultados brutos del MP-01 (infraestructura, nube y c�digo).   1. Filtrado de Falsos Positivos: Limpieza algor�tmica para descartar alertas err�neas. 2. C�lculo del Valor VPR: Asignaci�n del valor de priorizaci�n seg�n el rol del activo. 3. An�lisis de Impacto: Evaluaci�n del riesgo sobre la tr�ada de seguridad y la operaci�n. 4. Clasificaci�n por Criticidad: Agrupaci�n por urgencia usando motores de riesgo (ej. TruRisk). 5. Registro de Pentesting: Tratamiento unificado de hallazgos manuales. 6. Reportes de Diagn�stico:   Consolidaci�n de puntajes de exposici�n y rutas de ataque. | Direccionamiento Autom�tico: Recepci�n de incidencias y asignaci�n preconfigurada por tipo de activo.   1. Activaci�n de SLAs: Vinculaci�n de tiempos l�mite de correcci�n a cada ticket. 2. Ejecuci�n Remedaci�n / 4. Asunci�n de Riesgos: Ruta principal de correcci�n/parcheo o ruta alterna de aceptaci�n formal y mitigaci�n del riesgo si no es corregible. 3. Monitoreo y Escalamiento: Supervisi�n de tiempos y escalamiento autom�tico ante vencimientos. 4. Validaci�n de Cierre: Verificaci�n de que la vulnerabilidad fue eliminada. 5. Reporte de Cumplimiento:   Documentaci�n de adherencia a normativas y gobierno de TI. |

|  | 7. Traspaso: Env�o del listado crudo al macroproceso de  an�lisis. | 8. Direccionamiento Autom�tico: Asignaci�n automatizada del  ticket al equipo responsable. |  |
| **Actividades cr�ticas** | * Descubrimiento e inventario exhaustivo de activos de c�mputo para erradicar puntos ciegos. * Integraci�n fluida de los repositorios de c�digo de la empresa al ecosistema de escaneo. | * Filtrado efectivo de falsos positivos para no saturar al equipo de analistas. * C�lculo del Valor de Priorizaci�n (VPR) y clasificaci�n contextualizada mediante motores de riesgo. * Enrutamiento o direccionamiento automatizado inmediato de los incidentes. | * Evaluaci�n de factibilidad y bifurcaci�n correcta entre remediaci�n t�cnica o asunci�n formal de riesgos. * Escalamiento autom�tico preventivo antes de que expiren las ventanas de exposici�n. * Validaci�n rigurosa del cierre y mitigaci�n real del vector de ataque   antes de archivar. |
| **Factores de �xito** | * Visibilidad continua y cobertura amplia de toda la infraestructura de TI. * Automatizaci�n temprana en la ejecuci�n de los escaneos. * Contar con repositorios de c�digo y archivos de configuraci�n actualizados. | * Automatizaciones eficientes que depuren alertas irrelevantes. * Priorizaci�n basada en la criticidad real del activo y su impacto operativo. * Reportes diagn�sticos claros y asignaci�n sin retrasos humanos. | * Celeridad y rigor: Cumplimiento estricto de los tiempos l�mite (SLAs) preestablecidos. * Gobernanza s�lida: Procesos claros del CISO para documentar y absorber riesgos no remediables. * Reducci�n de la superficie: Evidencia documental y t�cnica de que la superficie de ataque disminuy� de   cara a auditor�as. |

|  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **Id.**  **Proceso** | **Id. Activo** | **Activo de Informaci�n** | **Descripci�n** | **Clasificaci�n (cr�tico/no cr�tico)** | **Relaci�n con otros activos**  **(s�/no)** | **Id. Del activo relacionado** | **Nombre del responsable** |
| VM-PROC1 | CH\_VULNS | Esc�neres de vulnerabilidades | Herramientas automatizadas (Tenable, Upwind,  GitHub). | Cr�tico | S� | CH\_SER, CH\_NET, CH\_CLD | Irmin Hern�ndez Jim�nez |
| CH\_SER | Servidores y vms | Infraestructura f�sica y virtual  monitoreada. | Cr�tico | S� | CH\_NET, CH\_VULNS | Cesar Alberto Mariano Reyes |
| CH\_NET | Dispositivos de red | Routers, Switches y  Firewalls. | Cr�tico | S� | CH\_SER, CH\_VULNS | Cesar Alberto Mariano Reyes |
| VM-PROC2 | CH\_CLD | Infraestructura cloud | Configuraciones y activos en la  nube. | Cr�tico | S� | CH\_VULNS | Cesar Alberto Mariano Reyes |
| CH\_DB | Base de datos de hallazgos | Dep�sito donde  se almacenan las alertas. | Cr�tico | S� | CH\_VULNS, CH\_TICK | Irmin Hern�ndez Jim�nez |
| CH\_PERS | Personal analista | Analistas encargados del filtrado de  datos. | No cr�tico | S� | CH\_TICK | Steven Arturo Esc�rcega Hern�ndez |
| VM-PROC3 | CH\_CODE | Repositorios de c�digo | C�digo fuente analizado para  remediaci�n. | Cr�tico | S� | CH\_DB, CH\_TICK | Irmin Hern�ndez Jim�nez |


| --- | --- | --- | --- | --- | --- | --- | --- |
|  | CH\_TICK | Sistema de tickets | Plataforma para el seguimiento  de remediaci�n. | Cr�tico | S� | CH\_DB, CH\_CODE, CH\_VULNS | Steven Arturo Esc�rcega Hern�ndez |
| CH\_MAN | Manuales de remediaci�n | Documentaci�n t�cnica para  parches. | No cr�tico | No |  | Steven Arturo Esc�rcega Hern�ndez |
