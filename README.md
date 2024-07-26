# Pós Tech SOAT3 - Hackaton
Link do vídeo <a href="https://youtu.be/BHP-Xmezx9s" target="_blank">aqui</a> <br>
## MVP: 
Para a aplicação, optamos por desenvolver o MVP em um monolito, dada a necessidade neste momento da validação do protótipo, agilidade e eficiência, a fim de que a empresa atenda ao seu Time to Market.

## Fase 2 – Evolução do MVP
Já na 2ª fase, utilizaremos todas as abordagens e melhores práticas, atendendo a todos os requisitos (funcionais e não funcionais).
Como temos serviços com perfis diferentes, optamos pela abordagem de microsserviços, pois assim conseguimos mapear e controlar de forma apartada os serviços que serão mais acessados.
Além da abordagem em microsserviços, explicamos abaixo como atenderemos cada requisito não funcional. São eles:
- <b>Alta disponibilidade:</b> Trabalharemos com Kubernetes (AWS EKS), onde cada POD será do tipo Deployment. Com essa abordagem podemos definir a quantidade de instâncias que estarão no ar e o cluster garantirá que isso aconteça, minimizando o impacto ao usuário. Além disso, configuraremos Health Checks que constantemente monitorarão as instâncias, garantindo que caso algum não esteja saudável / disponível ele a substitua. Além disso, teremos Load Balancers para direcionar o tráfego somente para as instâncias saudáveis.
- <b>Escalabilidade:</b> Para garantir desempenho e performance, mesmo nas situações de picos de acessos, trabalharemos com Horizontal Pod Autoscaling (HPA). Somado a isto, a própria abordagem de microsserviços permite que possamos aumentar instâncias somente dos serviços mais acessados.
- <b>Segurança:</b> Utilizaremos Cognito (Lambda) para garantir que somente sejam acessados usuários (pacientes e médicos) autenticados. Além disso, os serviços serão acessados centralizados pela API Gateway, que por sua vez encaminhará as requisições para os Load Balancer (public subnet), já que o acesso externo direto aos pod’s não estarão disponíveis (private subnets).
- <b>Performance:</b> Para os serviços que se estima grandes acessos, utilizaremos banco não relacional. Especificamente para a busca de médicos, serviço este que em conversa com o cliente é sempre o mais acessado e o “calcanhar de aquiles”, utilizaremos ElasticSearch. Além disso, sempre que um agendamento é realizado pelo paciente ou confirmado / cancelado pelo médico, utilizaremos fila (Amazon SQS), desacoplando  a aplicação de esperar eventuais problemas com envio de emails (servidores SMTP).

## Arquitetura Fase 2

![image](https://github.com/user-attachments/assets/4a3c2b19-4326-4cfe-bb94-bd1e1fe629d4)


### Integrantes Grupo 76

Gabriel da Silva Barreto<br>
gabrieldasilvabarreto@hotmail.com

Marcelo Gomes do Nascimento <br>
marcelogn2010@hotmail.com

Bruno Grun <br>
grunbruno@gmail.com
