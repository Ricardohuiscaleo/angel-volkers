
Lo destacado de la carpeta
Ejecuciones de automatización de IA para mensajería en WhatsApp estructuran respuestas en múltiples partes usando GPT-5 Nano.

{
  "name": "Video YT sin seguimientos",
  "nodes": [
    {
      "parameters": {
        "jsonSchemaExample": "{\n  \"response\": {\n    \"part_1\": \"Buen día. Soy el IA Triage de Basdonax. Vamos a ver si realmente puedo ayudar a implementar IA. 3 preguntas rápidas:\\\\n\\\\n\",\n    \"part_2\": \"1) ¿A qué se dedica tu empresa? (breve descripción)\\\\n2) ¿Qué canales usan para interactuar con clientes y cuántos mensajes diarios reciben en total? (WhatsApp, Instagram, Web, Email, otros)\",\n    \"part_3\": \"3) ¿Cuál es el mayor problema hoy con la atención al cliente?\\\\n\\\\n\",\n    \"part_4\": \"Contá las respuestas en este chat. Si hay buen encaje, te voy a enviar una serie de videos explicativos y, después, te paso al WhatsApp oficial con el link.\",\n    \"part_5\": \"Si realmente no hay fit, te comparto el contenido de YouTube para que puedas evaluar sin compromiso. ¿Te parece?\"\n  }\n}",
        "autoFix": true,
        "customizeRetryPrompt": true
      },
      "type": "@n8n/n8n-nodes-langchain.outputParserStructured",
      "typeVersion": 1.2,
      "position": [
        -6384,
        1152
      ],
      "id": "ae26b004-0ff5-4323-a111-b6509a581e2d",
      "name": "Structured Output Parser"
    },
    {
      "parameters": {
        "model": "gpt-5-nano-2025-08-07",
        "options": {
          "timeout": 60000,
          "maxRetries": 3
        }
      },
      "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
      "typeVersion": 1,
      "position": [
        -6640,
        1088
      ],
      "id": "845dcdfd-25bb-4494-9f88-547934c16384",
      "name": "OpenAI Chat Model2",
      "credentials": {
        "openAiApi": {
          "id": "v9lZfFrk7pXc5Obn",
          "name": "OpenAi account"
        }
      }
    },
    {
      "parameters": {
        "promptType": "define",
        "text": "=Mensaje a formatear: {{ $json.output }}",
        "hasOutputParser": true,
        "messages": {
          "messageValues": [
            {
              "message": "=Formatea el mensaje que te va a llegar en varias partes, no inventes contenido, solo separa el mensaje que te llega, no inventes nada.\n\nNunca digas en tu respuesta al incio: \"Mensaje a formatear:\", da directamente tu respesta."
            }
          ]
        }
      },
      "type": "@n8n/n8n-nodes-langchain.chainLlm",
      "typeVersion": 1.5,
      "position": [
        -6528,
        816
      ],
      "id": "5edf677c-fc11-4358-b89e-ef12ed0696f9",
      "name": "Format Chain",
      "retryOnFail": true,
      "maxTries": 5,
      "onError": "continueErrorOutput"
    },
    {
      "parameters": {
        "content": "## Gestión API Whatsapp",
        "height": 880,
        "width": 1692
      },
      "type": "n8n-nodes-base.stickyNote",
      "position": [
        -16512,
        464
      ],
      "typeVersion": 1,
      "id": "292e1e6d-af6d-41e0-a4c6-0e98eeb6b22b",
      "name": "Sticky Note1"
    },
    {
      "parameters": {
        "content": "## Se estructura y envia en varias partes",
        "height": 1376,
        "width": 4372,
        "color": 6
      },
      "type": "n8n-nodes-base.stickyNote",
      "position": [
        -6736,
        240
      ],
      "typeVersion": 1,
      "id": "dab44d51-804e-4327-8bed-d28fad5a3add",
      "name": "Sticky Note2"
    },
    {
      "parameters": {
        "method": "POST",
        "url": "={{ $('¿respuesta a mensaje?').item.json.url_chatwoot }}api/v1/accounts/1/conversations/{{ $('Input').item.json.body.conversation.messages[0].conversation_id }}/messages",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {
              "name": "api_access_token",
              "value": "={{ $('¿respuesta a mensaje?').item.json.api_key_chatwoot }}"
            },
            {
              "name": "Content-Type",
              "value": "application/json"
            }
          ]
        },
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={\n  \"content\": \"{{ $json.content }}\",\n  \"message_type\": \"outgoing\",\n  \"private\": false\n}\n",
        "options": {}
      },
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        -5792,
        1360
      ],
      "id": "ab05a610-48b7-4e46-abff-ad37a29983ec",
      "name": "HTTP Request3"
    },
    {
      "parameters": {
        "amount": 2
      },
      "type": "n8n-nodes-base.wait",
      "typeVersion": 1.1,
      "position": [
        -5344,
        752
      ],
      "id": "9069f749-8f6e-4514-b415-db3b360d8099",
      "name": "Wait",
      "webhookId": "04226b0c-6b70-4a4c-afe2-d63cb15bb9ba"
    },
    {
      "parameters": {
        "conditions": {
          "options": {
            "caseSensitive": true,
            "leftValue": "",
            "typeValidation": "strict",
            "version": 2
          },
          "conditions": [
            {
              "id": "8d46d583-b82d-4d85-a0b8-2c30006082a0",
              "leftValue": "={{ $('Format Chain').item.json.output.response.part_2 }}",
              "rightValue": "",
              "operator": {
                "type": "string",
                "operation": "notEmpty",
                "singleValue": true
              }
            }
          ],
          "combinator": "and"
        },
        "options": {}
      },
      "type": "n8n-nodes-base.if",
      "typeVersion": 2.2,
      "position": [
        -5552,
        848
      ],
      "id": "bb6cedbb-b272-448f-917b-f4ebd3563dff",
      "name": "If2"
    },
    {
      "parameters": {
        "amount": 2
      },
      "type": "n8n-nodes-base.wait",
      "typeVersion": 1.1,
      "position": [
        -4544,
        768
      ],
      "id": "f8b0b676-ae67-46ad-a187-66540783ae3b",
      "name": "Wait1",
      "webhookId": "5566565f-e5c5-466a-a891-488d94158a5d"
    },
    {
      "parameters": {
        "conditions": {
          "options": {
            "caseSensitive": true,
            "leftValue": "",
            "typeValidation": "strict",
            "version": 2
          },
          "conditions": [
            {
              "id": "3c7eb0e9-13ee-40d6-9738-057a02ac1306",
              "leftValue": "={{ $('Format Chain').item.json.output.response.part_3 }}",
              "rightValue": "",
              "operator": {
                "type": "string",
                "operation": "notEmpty",
                "singleValue": true
              }
            }
          ],
          "combinator": "and"
        },
        "options": {}
      },
      "type": "n8n-nodes-base.if",
      "typeVersion": 2.2,
      "position": [
        -4832,
        880
      ],
      "id": "b7cdaa76-68ab-46e5-b1d4-971ed137cc90",
      "name": "If7"
    },
    {
      "parameters": {
        "amount": 2
      },
      "type": "n8n-nodes-base.wait",
      "typeVersion": 1.1,
      "position": [
        -3744,
        800
      ],
      "id": "39eef947-1e77-4fea-85ee-c2ef8b2ba554",
      "name": "Wait2",
      "webhookId": "ef5a778e-e0d6-4bfa-81cb-40b66ee4e983"
    },
    {
      "parameters": {
        "conditions": {
          "options": {
            "caseSensitive": true,
            "leftValue": "",
            "typeValidation": "strict",
            "version": 2
          },
          "conditions": [
            {
              "id": "3c7eb0e9-13ee-40d6-9738-057a02ac1306",
              "leftValue": "={{ $('Format Chain').item.json.output.response.part_4 }}",
              "rightValue": "",
              "operator": {
                "type": "string",
                "operation": "notEmpty",
                "singleValue": true
              }
            }
          ],
          "combinator": "and"
        },
        "options": {}
      },
      "type": "n8n-nodes-base.if",
      "typeVersion": 2.2,
      "position": [
        -4032,
        896
      ],
      "id": "a11c130d-429a-4fc8-9152-1126cf12777c",
      "name": "If"
    },
    {
      "parameters": {
        "amount": 2
      },
      "type": "n8n-nodes-base.wait",
      "typeVersion": 1.1,
      "position": [
        -2784,
        752
      ],
      "id": "c0d5da1d-8bdd-47d7-a568-2ae03253ac9d",
      "name": "Wait3",
      "webhookId": "ae8fd048-da52-451c-902a-b47789b29fe5"
    },
    {
      "parameters": {
        "conditions": {
          "options": {
            "caseSensitive": true,
            "leftValue": "",
            "typeValidation": "strict",
            "version": 2
          },
          "conditions": [
            {
              "id": "3c7eb0e9-13ee-40d6-9738-057a02ac1306",
              "leftValue": "={{ $('Format Chain').item.json.output.response.part_5 }}",
              "rightValue": "",
              "operator": {
                "type": "string",
                "operation": "notEmpty",
                "singleValue": true
              }
            }
          ],
          "combinator": "and"
        },
        "options": {}
      },
      "type": "n8n-nodes-base.if",
      "typeVersion": 2.2,
      "position": [
        -3248,
        912
      ],
      "id": "ee27ddd5-4d9e-4933-803b-7a3cc455e392",
      "name": "If8"
    },
    {
      "parameters": {},
      "type": "n8n-nodes-base.noOp",
      "typeVersion": 1,
      "position": [
        -15824,
        832
      ],
      "id": "eaa95824-3e50-4efc-aa90-3b19a02c083d",
      "name": "No Operation, do nothing2"
    },
    {
      "parameters": {
        "amount": 30
      },
      "type": "n8n-nodes-base.wait",
      "typeVersion": 1.1,
      "position": [
        -9584,
        832
      ],
      "id": "a2dfad9d-ab16-4adf-ad1f-021d32a22c63",
      "name": "Wait6",
      "webhookId": "62ca77bc-b7b4-4499-9b90-0e920909ba36"
    },
    {
      "parameters": {},
      "type": "n8n-nodes-base.noOp",
      "typeVersion": 1,
      "position": [
        -8880,
        1072
      ],
      "id": "2744012f-6419-474e-814e-586e1bd6acdb",
      "name": "No Operation, do nothing1"
    },
    {
      "parameters": {
        "content": "## Recolectar Mensajes Metodo brasilero",
        "height": 540,
        "width": 1400,
        "color": 4
      },
      "type": "n8n-nodes-base.stickyNote",
      "position": [
        -9840,
        688
      ],
      "typeVersion": 1,
      "id": "72522254-dcfe-48de-9adf-bfa1320d00c5",
      "name": "Sticky Note4"
    },
    {
      "parameters": {
        "resource": "audio",
        "operation": "transcribe",
        "options": {}
      },
      "type": "@n8n/n8n-nodes-langchain.openAi",
      "typeVersion": 1.7,
      "position": [
        -11168,
        656
      ],
      "id": "c0e6bc59-05aa-4a22-a814-20b312b68db2",
      "name": "OpenAI1",
      "credentials": {
        "openAiApi": {
          "id": "v9lZfFrk7pXc5Obn",
          "name": "OpenAi account"
        }
      }
    },
    {
      "parameters": {
        "url": "={{ $('Input').item.json.body.attachments[0].data_url }}",
        "authentication": "predefinedCredentialType",
        "nodeCredentialType": "whatsAppApi",
        "options": {}
      },
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        -11424,
        656
      ],
      "id": "98455202-9db4-4142-a941-e46132874756",
      "name": "HTTP Request13",
      "credentials": {
        "whatsAppApi": {
          "id": "khWsYmJu2DtrLCot",
          "name": "WhatsApp account"
        }
      }
    },
    {
      "parameters": {
        "resource": "image",
        "operation": "analyze",
        "modelId": {
          "__rl": true,
          "value": "gpt-4o-mini",
          "mode": "list",
          "cachedResultName": "GPT-4O-MINI"
        },
        "text": "Que hay en esta imagen? describimelo con todo detalle",
        "imageUrls": "={{ $('Datos').item.json.data_url }}",
        "options": {}
      },
      "type": "@n8n/n8n-nodes-langchain.openAi",
      "typeVersion": 1.7,
      "position": [
        -11184,
        896
      ],
      "id": "88dba226-8faf-48e5-9246-fa3935191ee4",
      "name": "OpenAI",
      "credentials": {
        "openAiApi": {
          "id": "v9lZfFrk7pXc5Obn",
          "name": "OpenAi account"
        }
      }
    },
    {
      "parameters": {
        "conditions": {
          "options": {
            "caseSensitive": true,
            "leftValue": "",
            "typeValidation": "strict",
            "version": 2
          },
          "conditions": [
            {
              "id": "e76d5a8e-1040-4e97-88a5-36c54547b11d",
              "leftValue": "={{ $json.timeDifference.seconds }}",
              "rightValue": 5,
              "operator": {
                "type": "number",
                "operation": "lt"
              }
            }
          ],
          "combinator": "and"
        },
        "looseTypeValidation": "=",
        "options": {}
      },
      "type": "n8n-nodes-base.if",
      "typeVersion": 2.2,
      "position": [
        -15392,
        624
      ],
      "id": "59152e79-0dac-4749-88aa-671529c30eae",
      "name": "Menos de 5 segundos?",
      "onError": "continueRegularOutput"
    },
    {
      "parameters": {
        "conditions": {
          "options": {
            "caseSensitive": true,
            "leftValue": "",
            "typeValidation": "strict",
            "version": 2
          },
          "conditions": [
            {
              "id": "531b8118-2092-4c8a-a013-d840b9da1d6b",
              "leftValue": "={{ $json.body.message_type }}",
              "rightValue": "=incoming",
              "operator": {
                "type": "string",
                "operation": "equals",
                "name": "filter.operator.equals"
              }
            }
          ],
          "combinator": "and"
        },
        "options": {}
      },
      "type": "n8n-nodes-base.if",
      "typeVersion": 2.2,
      "position": [
        -16480,
        672
      ],
      "id": "289d0a54-4bbb-4adb-aae0-12c67e863671",
      "name": "incoming?"
    },
    {
      "parameters": {
        "conditions": {
          "options": {
            "caseSensitive": true,
            "leftValue": "",
            "typeValidation": "strict",
            "version": 2
          },
          "conditions": [
            {
              "id": "73541b8d-e557-47ce-9e87-8a70d4665cb4",
              "leftValue": "={{ $json.body.conversation.messages[0].content }}",
              "rightValue": "",
              "operator": {
                "type": "string",
                "operation": "notEmpty",
                "singleValue": true
              }
            },
            {
              "id": "46b9c862-4543-4b5b-8ad6-1f18b3bd76c4",
              "leftValue": "={{ $json.body.attachments[0].file_type }}",
              "rightValue": "audio",
              "operator": {
                "type": "string",
                "operation": "equals",
                "name": "filter.operator.equals"
              }
            },
            {
              "id": "fde2dabf-9e4c-4301-849c-ced1386eae04",
              "leftValue": "={{ $json.body.attachments[0].file_type }}",
              "rightValue": "=image",
              "operator": {
                "type": "string",
                "operation": "equals",
                "name": "filter.operator.equals"
              }
            },
            {
              "id": "72a3d0b2-03d0-4851-a010-257456c22f85",
              "leftValue": "={{ $json.body.conversation.messages[0].attachments[0].file_type }}",
              "rightValue": "file",
              "operator": {
                "type": "string",
                "operation": "equals",
                "name": "filter.operator.equals"
              }
            }
          ],
          "combinator": "or"
        },
        "options": {}
      },
      "type": "n8n-nodes-base.if",
      "typeVersion": 2.2,
      "position": [
        -16144,
        656
      ],
      "id": "8053c0d9-f37d-4f6a-b0b0-7b017cc0e37f",
      "name": "Tiene contenido?",
      "onError": "continueRegularOutput"
    },
    {
      "parameters": {},
      "type": "n8n-nodes-base.noOp",
      "typeVersion": 1,
      "position": [
        -15168,
        912
      ],
      "id": "5b8c7c3c-8434-465c-a8a9-9244524edfeb",
      "name": "No Operation, do nothing"
    },
    {
      "parameters": {
        "content": "## Bot ON/OFF",
        "height": 1332,
        "width": 1728,
        "color": 2
      },
      "type": "n8n-nodes-base.stickyNote",
      "position": [
        -14736,
        320
      ],
      "typeVersion": 1,
      "id": "f4ce4efb-5b46-4153-a668-59785433b554",
      "name": "Sticky Note"
    },
    {
      "parameters": {
        "content": "## Tipo de mensaje",
        "height": 1600,
        "width": 2540,
        "color": 3
      },
      "type": "n8n-nodes-base.stickyNote",
      "position": [
        -12784,
        0
      ],
      "typeVersion": 1,
      "id": "0effb498-b9ae-4ed7-8071-b6bee66c8152",
      "name": "Sticky Note5"
    },
    {
      "parameters": {
        "operation": "push",
        "list": "={{ $('Datos').first().json.telefono_usuario }}",
        "messageData": "={{ $json.response }}",
        "tail": true
      },
      "type": "n8n-nodes-base.redis",
      "typeVersion": 1,
      "position": [
        -9792,
        832
      ],
      "id": "e96c5412-f917-470f-a444-7e00148a144f",
      "name": "Guarda mensajes",
      "credentials": {
        "redis": {
          "id": "DcoalrTy5Yt6xSHo",
          "name": "Redis account"
        }
      }
    },
    {
      "parameters": {
        "operation": "get",
        "propertyName": "mensajes",
        "key": "={{ $('Datos').first().json.telefono_usuario }}",
        "options": {}
      },
      "type": "n8n-nodes-base.redis",
      "typeVersion": 1,
      "position": [
        -9360,
        832
      ],
      "id": "21877af3-3f6b-4d95-b8af-4bbd39d02873",
      "name": "Recupera mensajes",
      "credentials": {
        "redis": {
          "id": "DcoalrTy5Yt6xSHo",
          "name": "Redis account"
        }
      }
    },
    {
      "parameters": {
        "conditions": {
          "options": {
            "caseSensitive": true,
            "leftValue": "",
            "typeValidation": "strict",
            "version": 2
          },
          "conditions": [
            {
              "id": "8a313a41-eadc-4ada-bc2a-feff79845de9",
              "leftValue": "={{ $json.mensajes.last() }}",
              "rightValue": "={{ $('response').item.json.response }}",
              "operator": {
                "type": "string",
                "operation": "equals",
                "name": "filter.operator.equals"
              }
            }
          ],
          "combinator": "and"
        },
        "options": {}
      },
      "type": "n8n-nodes-base.if",
      "typeVersion": 2.2,
      "position": [
        -9120,
        832
      ],
      "id": "1e1c709d-bc06-4bf2-9367-e09e49e9aa11",
      "name": "¿terminó de mandar mensajes?"
    },
    {
      "parameters": {
        "operation": "delete",
        "key": "={{ $('Datos').first().json.telefono_usuario }}"
      },
      "type": "n8n-nodes-base.redis",
      "typeVersion": 1,
      "position": [
        -8592,
        816
      ],
      "id": "ecd11c80-d43c-4ed4-b029-37201a62231b",
      "name": "Borra mensajes de BD",
      "credentials": {
        "redis": {
          "id": "DcoalrTy5Yt6xSHo",
          "name": "Redis account"
        }
      }
    },
    {
      "parameters": {
        "operation": "getTimeBetweenDates",
        "startDate": "={{ $('Input').item.json.body.conversation.messages[0].updated_at }}",
        "endDate": "={{ $json.currentDate }}",
        "units": [
          "second"
        ],
        "options": {}
      },
      "type": "n8n-nodes-base.dateTime",
      "typeVersion": 2,
      "position": [
        -15648,
        624
      ],
      "id": "9aacca18-46af-4499-8674-e1cf02338895",
      "name": "Calcular tiempo entre mensaje y fecha actual"
    },
    {
      "parameters": {
        "options": {}
      },
      "type": "n8n-nodes-base.dateTime",
      "typeVersion": 2,
      "position": [
        -15872,
        624
      ],
      "id": "656e56b1-2870-4e4b-bf26-0681a2712178",
      "name": "Fecha actual"
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "d5f82380-4858-4361-908e-98e45c98f092",
              "name": "mensaje_usuario",
              "value": "={{ $('Recupera mensajes').item.json.mensajes.join() }}",
              "type": "string"
            }
          ]
        },
        "options": {}
      },
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        -8848,
        816
      ],
      "id": "72a430ec-e3d6-4c09-ab0a-ad0a8b131221",
      "name": "Paquete de mensajes"
    },
    {
      "parameters": {
        "jsCode": "// Obtenemos todos los items de entrada\nconst items = $input.all();\n\nreturn items.map(item => {\n  const responseIn = item.json.output?.response || {};\n  const response = { ...responseIn };\n\n  for (const [key, val] of Object.entries(response)) {\n    if (typeof val === 'string') {\n      let s = val;\n\n      // 1) Normalizaciones básicas\n      s = s.replace(/[\"“”]/g, \"'\")     // comillas dobles/curvas → simples\n           .replace(/\\r\\n/g, \"\\n\")     // CRLF → LF\n           .replace(/\\n{3,}/g, \"\\n\\n\") // máx 2 saltos seguidos\n           .trim();\n\n      // 2) Des-escapar secuencias literales\n      //    Si tu string trae \"\\\\n\" (dos chars), lo pasamos a salto real\n      s = s.replace(/\\\\n/g, \"\\n\")\n           .replace(/\\\\t/g, \"\\t\");\n\n      response[key] = s;\n    }\n  }\n\n  return {\n    json: {\n      content: response,   // part_1, part_2, etc. con saltos reales\n      message_type: \"outgoing\",\n      private: false\n    }\n  };\n});"
      },
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        -6064,
        848
      ],
      "id": "e1d3b051-5ce3-4ba9-b422-ba67c5a70379",
      "name": "Formatea texto respuesta"
    },
    {
      "parameters": {
        "method": "POST",
        "url": "={{ $('¿respuesta a mensaje?').item.json.url_chatwoot }}api/v1/accounts/1/conversations/{{ $('Input').item.json.body.conversation.messages[0].conversation_id }}/messages",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {
              "name": "api_access_token",
              "value": "={{ $('¿respuesta a mensaje?').item.json.api_key_chatwoot }}"
            },
            {
              "name": "Content-Type",
              "value": "application/json"
            }
          ]
        },
        "sendBody": true,
        "bodyParameters": {
          "parameters": [
            {
              "name": "content",
              "value": "={{ $json.content.part_1 }}"
            },
            {
              "name": "message_type",
              "value": "outgoing"
            },
            {
              "name": "private",
              "value": "false"
            }
          ]
        },
        "options": {}
      },
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        -5824,
        848
      ],
      "id": "19393ad8-da5d-411b-9a56-617f565a07e0",
      "name": "1ª Parte Respuesta",
      "onError": "continueErrorOutput"
    },
    {
      "parameters": {
        "method": "POST",
        "url": "={{ $('¿respuesta a mensaje?').item.json.url_chatwoot }}api/v1/accounts/1/conversations/{{ $('Input').item.json.body.conversation.messages[0].conversation_id }}/messages",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {
              "name": "api_access_token",
              "value": "={{ $('¿respuesta a mensaje?').item.json.api_key_chatwoot }}"
            },
            {
              "name": "Content-Type",
              "value": "application/json"
            }
          ]
        },
        "sendBody": true,
        "bodyParameters": {
          "parameters": [
            {
              "name": "content",
              "value": "={{ $('Formatea texto respuesta').item.json.content.part_2 }}"
            },
            {
              "name": "message_type",
              "value": "outgoing"
            },
            {
              "name": "private",
              "value": "false"
            }
          ]
        },
        "options": {}
      },
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        -5088,
        752
      ],
      "id": "e1515134-6a17-424e-8be3-7b7df1f427e3",
      "name": "2ª Parte Respuesta",
      "onError": "continueErrorOutput"
    },
    {
      "parameters": {
        "method": "POST",
        "url": "={{ $('¿respuesta a mensaje?').item.json.url_chatwoot }}api/v1/accounts/1/conversations/{{ $('Input').item.json.body.conversation.messages[0].conversation_id }}/messages",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {
              "name": "api_access_token",
              "value": "={{ $('¿respuesta a mensaje?').item.json.api_key_chatwoot }}"
            },
            {
              "name": "Content-Type",
              "value": "application/json"
            }
          ]
        },
        "sendBody": true,
        "bodyParameters": {
          "parameters": [
            {
              "name": "content",
              "value": "={{ $('Formatea texto respuesta').item.json.content.part_3 }}"
            },
            {
              "name": "message_type",
              "value": "outgoing"
            },
            {
              "name": "private",
              "value": "false"
            }
          ]
        },
        "options": {}
      },
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        -4352,
        768
      ],
      "id": "64fd3558-0453-4fe6-a8f1-561e804e8e79",
      "name": "3ª Parte Respuesta"
    },
    {
      "parameters": {
        "method": "POST",
        "url": "={{ $('¿respuesta a mensaje?').item.json.url_chatwoot }}api/v1/accounts/1/conversations/{{ $('Input').item.json.body.conversation.messages[0].conversation_id }}/messages",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {
              "name": "api_access_token",
              "value": "={{ $('¿respuesta a mensaje?').item.json.api_key_chatwoot }}"
            },
            {
              "name": "Content-Type",
              "value": "application/json"
            }
          ]
        },
        "sendBody": true,
        "bodyParameters": {
          "parameters": [
            {
              "name": "content",
              "value": "={{ $('Formatea texto respuesta').item.json.content.part_4 }}"
            },
            {
              "name": "message_type",
              "value": "outgoing"
            },
            {
              "name": "private",
              "value": "false"
            }
          ]
        },
        "options": {}
      },
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        -3552,
        800
      ],
      "id": "e9dfa0db-6bca-4ee2-bfe8-cfd0c18659a1",
      "name": "4ª Parte Respuesta"
    },
    {
      "parameters": {
        "method": "POST",
        "url": "={{ $('¿respuesta a mensaje?').item.json.url_chatwoot }}api/v1/accounts/1/conversations/{{ $('Input').item.json.body.conversation.messages[0].conversation_id }}/messages",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {
              "name": "api_access_token",
              "value": "={{ $('¿respuesta a mensaje?').item.json.api_key_chatwoot }}"
            },
            {
              "name": "Content-Type",
              "value": "application/json"
            }
          ]
        },
        "sendBody": true,
        "bodyParameters": {
          "parameters": [
            {
              "name": "content",
              "value": "={{ $('Formatea texto respuesta').item.json.content.part_5 }}"
            },
            {
              "name": "message_type",
              "value": "outgoing"
            },
            {
              "name": "private",
              "value": "false"
            }
          ]
        },
        "options": {}
      },
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        -2544,
        752
      ],
      "id": "7e36409c-4be9-4858-a72b-ced8c60a67e4",
      "name": "5ª Parte Respuesta"
    },
    {
      "parameters": {
        "rules": {
          "values": [
            {
              "conditions": {
                "options": {
                  "caseSensitive": true,
                  "leftValue": "",
                  "typeValidation": "strict",
                  "version": 2
                },
                "conditions": [
                  {
                    "id": "55668d32-f96a-4326-8b0e-41d57518e72b",
                    "leftValue": "={{ $json.attachments }}",
                    "rightValue": "audio",
                    "operator": {
                      "type": "string",
                      "operation": "equals",
                      "name": "filter.operator.equals"
                    }
                  }
                ],
                "combinator": "and"
              },
              "renameOutput": true,
              "outputKey": "Audio"
            },
            {
              "conditions": {
                "options": {
                  "caseSensitive": true,
                  "leftValue": "",
                  "typeValidation": "strict",
                  "version": 2
                },
                "conditions": [
                  {
                    "id": "695c9df0-8e39-4011-a261-e39879c8173e",
                    "leftValue": "={{ $json.attachments }}",
                    "rightValue": "image",
                    "operator": {
                      "type": "string",
                      "operation": "equals",
                      "name": "filter.operator.equals"
                    }
                  }
                ],
                "combinator": "and"
              },
              "renameOutput": true,
              "outputKey": "Imagen"
            },
            {
              "conditions": {
                "options": {
                  "caseSensitive": true,
                  "leftValue": "",
                  "typeValidation": "strict",
                  "version": 2
                },
                "conditions": [
                  {
                    "id": "34b2a480-9048-4346-bb53-18882ced499b",
                    "leftValue": "={{ $json.attachments }}",
                    "rightValue": "file",
                    "operator": {
                      "type": "string",
                      "operation": "equals",
                      "name": "filter.operator.equals"
                    }
                  }
                ],
                "combinator": "and"
              },
              "renameOutput": true,
              "outputKey": "PDF"
            },
            {
              "conditions": {
                "options": {
                  "caseSensitive": true,
                  "leftValue": "",
                  "typeValidation": "strict",
                  "version": 2
                },
                "conditions": [
                  {
                    "leftValue": "={{ $json.texto }}",
                    "rightValue": "",
                    "operator": {
                      "type": "string",
                      "operation": "exists",
                      "singleValue": true
                    },
                    "id": "1038327d-d5fb-41ee-98ee-3831221d6ad0"
                  }
                ],
                "combinator": "and"
              },
              "renameOutput": true,
              "outputKey": "Texto"
            }
          ]
        },
        "options": {}
      },
      "type": "n8n-nodes-base.switch",
      "typeVersion": 3.2,
      "position": [
        -11984,
        720
      ],
      "id": "3997268f-7b30-41d5-b202-4c6c9565a621",
      "name": "Switch"
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "095fb2af-b207-483a-b709-b16a9a0919bd",
              "name": "response",
              "value": "={{ $json.response }}",
              "type": "string"
            }
          ]
        },
        "options": {}
      },
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        -10096,
        816
      ],
      "id": "1abbb90d-f1d2-49e9-9974-c7102d0594cb",
      "name": "response"
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "4ee88607-cc89-4b97-b7e0-1f515cbebf33",
              "name": "attachments",
              "value": "={{ $('Input').item.json.body.attachments[0].file_type }}",
              "type": "string"
            },
            {
              "id": "7a0aeb78-3507-4ded-8e5e-ebea56abf488",
              "name": "data_url",
              "value": "={{ $('Input').item.json.body.attachments[0].data_url }}",
              "type": "string"
            },
            {
              "id": "edf79fdb-0c38-4b89-a43d-f182da2c1054",
              "name": "texto",
              "value": "={{ $('Input').item.json.body.content }}",
              "type": "string"
            },
            {
              "id": "c985d5ef-57b2-4e79-84f9-a91a29f21934",
              "name": "On/Off",
              "value": "={{ $('Input').item.json.body.sender.custom_attributes.bot }}",
              "type": "string"
            },
            {
              "id": "af6683ab-966b-4270-ac5b-3e74824214cb",
              "name": "conversation_id",
              "value": "={{ $('Input').item.json.body.conversation.messages[0].conversation_id }}",
              "type": "string"
            },
            {
              "id": "4c7fa68f-4e59-4d37-a293-26899246d4f7",
              "name": "contact_id",
              "value": "={{ $('Input').item.json.body.conversation.contact_inbox.contact_id }}",
              "type": "string"
            },
            {
              "id": "bc61b645-2286-4d02-bbc3-408c84c416ef",
              "name": "telefono_usuario",
              "value": "={{\n  $('Input').item.json.body?.sender?.phone_number\n  ?? $('Input').item.json.body?.conversation?.messages?.[0]?.sender?.additional_attributes?.social_profiles?.instagram\n  ?? $('Input').item.json.body?.conversation?.meta?.sender?.name\n  ?? ''\n}}",
              "type": "string"
            },
            {
              "id": "cf27a001-c234-49ef-b7b6-fafad3f23f3a",
              "name": "respuesta_a_mensaje",
              "value": "={{ $('Input').item.json.body.content_attributes.in_reply_to }}",
              "type": "number"
            },
            {
              "id": "872124d7-fcaf-4427-ab4a-feca63b1ecf7",
              "name": "account_id",
              "value": "={{ $('Input').item.json.body.sender.account.id }}",
              "type": "number"
            },
            {
              "id": "5f6f015f-233d-4464-a959-46de2eebe344",
              "name": "url_chatwoot",
              "value": "",
              "type": "string"
            },
            {
              "id": "e108f6a8-2600-4e91-bc79-5376d439702f",
              "name": "api_key_chatwoot",
              "value": "",
              "type": "string"
            }
          ]
        },
        "options": {}
      },
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        -13600,
        1056
      ],
      "id": "dac09174-c0f9-416d-8c55-ac9cb13c325f",
      "name": "Datos"
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "d861e70d-6e86-4d61-b10b-80d485805a7b",
              "name": "response",
              "value": "={{ $json.text }}",
              "type": "string"
            }
          ]
        },
        "options": {}
      },
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        -10864,
        656
      ],
      "id": "166c5c24-cb2f-499f-93bc-e6c116b50204",
      "name": "response (Audio)"
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "73e483b4-57f0-43b0-a69e-f28fb27dec28",
              "name": "response",
              "value": "={{ $json.content }}",
              "type": "string"
            }
          ]
        },
        "options": {}
      },
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        -10848,
        896
      ],
      "id": "6115f8d8-2f19-4f82-bb6e-a3dc1fa93024",
      "name": "response (Imagen)"
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "9e3cc504-cf83-4c47-8b2d-469d52308177",
              "name": "response",
              "value": "=Enviate una imagen. porque enviaste un PDF",
              "type": "string"
            }
          ]
        },
        "options": {}
      },
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        -10992,
        1120
      ],
      "id": "f11339d3-4ec0-4bf1-be61-760c678e70b7",
      "name": "response (PDF)"
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "6aef9fa6-2963-421a-9cde-3078c5c7a69b",
              "name": "response",
              "value": "={{ $('Input').item.json.body.conversation.messages[0].content }}",
              "type": "string"
            }
          ]
        },
        "options": {}
      },
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        -10960,
        1328
      ],
      "id": "edb0803a-c434-4ce1-8a52-a7f79b9af69c",
      "name": "response (Text)"
    },
    {
      "parameters": {
        "resource": "image",
        "operation": "analyze",
        "modelId": {
          "__rl": true,
          "value": "gpt-4o-mini",
          "mode": "list",
          "cachedResultName": "GPT-4O-MINI"
        },
        "text": "Que hay en esta imagen? describimelo con todo detalle",
        "imageUrls": "={{ $('Datos').item.json.data_url }}",
        "options": {}
      },
      "type": "@n8n/n8n-nodes-langchain.openAi",
      "typeVersion": 1.7,
      "position": [
        -11552,
        160
      ],
      "id": "f94b8b6a-71c1-4842-bfe1-91ae637c6b75",
      "name": "OpenAI2",
      "credentials": {
        "openAiApi": {
          "id": "v9lZfFrk7pXc5Obn",
          "name": "OpenAi account"
        }
      }
    },
    {
      "parameters": {
        "operation": "push",
        "list": "={{ $('Datos').item.json.telefono_usuario }}",
        "messageData": "={{ $('Datos').item.json.texto }}",
        "tail": true
      },
      "type": "n8n-nodes-base.redis",
      "typeVersion": 1,
      "position": [
        -11744,
        160
      ],
      "id": "21ef6d0b-2a54-4b0a-a800-ef1d1bf5389e",
      "name": "Guarda mensajes1",
      "credentials": {
        "redis": {
          "id": "DcoalrTy5Yt6xSHo",
          "name": "Redis account"
        }
      }
    },
    {
      "parameters": {
        "operation": "get",
        "propertyName": "mensajes",
        "key": "={{ $('Datos').first().json.telefono_usuario }}",
        "options": {}
      },
      "type": "n8n-nodes-base.redis",
      "typeVersion": 1,
      "position": [
        -11104,
        160
      ],
      "id": "381ddb3b-8117-4ec5-8777-3fae928b6d42",
      "name": "Recupera mensajes1",
      "credentials": {
        "redis": {
          "id": "DcoalrTy5Yt6xSHo",
          "name": "Redis account"
        }
      }
    },
    {
      "parameters": {
        "operation": "delete",
        "key": "={{ $('Datos').first().json.telefono_usuario }}"
      },
      "type": "n8n-nodes-base.redis",
      "typeVersion": 1,
      "position": [
        -10880,
        160
      ],
      "id": "454feb97-7720-4d2c-ba0a-c43500ee77ce",
      "name": "Borra mensajes de BD1",
      "credentials": {
        "redis": {
          "id": "DcoalrTy5Yt6xSHo",
          "name": "Redis account"
        }
      }
    },
    {
      "parameters": {
        "operation": "push",
        "list": "={{ $('Datos').first().json.telefono_usuario }}",
        "messageData": "={{ $json.content }}",
        "tail": true
      },
      "type": "n8n-nodes-base.redis",
      "typeVersion": 1,
      "position": [
        -11328,
        160
      ],
      "id": "ba135c5e-23dc-4383-a4d1-3cbf4c18ac43",
      "name": "Guarda mensajes2",
      "credentials": {
        "redis": {
          "id": "DcoalrTy5Yt6xSHo",
          "name": "Redis account"
        }
      }
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "8c10be58-d54d-4b3f-96b1-39b5ebd36c04",
              "name": "response",
              "value": "=({{ $('Recupera mensajes1').item.json.mensajes[0] }}\n{{ $('Recupera mensajes1').item.json.mensajes[1] }})",
              "type": "string"
            }
          ]
        },
        "options": {}
      },
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        -10688,
        160
      ],
      "id": "16422367-31b9-4d65-b577-04a68f89dabf",
      "name": "response (texto/imagen)"
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "3bfa16d0-d267-4c4c-930b-16c43a4d9766",
              "name": "mensaje_usuario",
              "value": "={{ $('Paquete de mensajes').item.json.mensaje_usuario }}",
              "type": "string"
            },
            {
              "id": "35cfb6fa-22ac-4cf6-88ce-55a9494feb94",
              "name": "telefono_usuario",
              "value": "={{ $('Datos').first().json.telefono_usuario }}",
              "type": "string"
            },
            {
              "id": "fc96c8ef-0f5f-4d59-a5a0-d1bf1b46010a",
              "name": "conversation_id",
              "value": "={{ $('Datos').first().json.conversation_id }}",
              "type": "string"
            },
            {
              "id": "1d493c80-c01a-4a06-af1a-70f8eb3908e5",
              "name": "contact_id",
              "value": "={{ $('Datos').first().json.contact_id }}",
              "type": "string"
            }
          ]
        },
        "options": {}
      },
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        -8352,
        832
      ],
      "id": "d5f24045-66ed-4e49-b945-25879820099c",
      "name": "Input Agente"
    },
    {
      "parameters": {
        "conditions": {
          "options": {
            "caseSensitive": true,
            "leftValue": "",
            "typeValidation": "strict",
            "version": 2
          },
          "conditions": [
            {
              "id": "883670f1-378a-4825-98f3-ebc1cb50ff05",
              "leftValue": "={{ $json.texto }}",
              "rightValue": "",
              "operator": {
                "type": "string",
                "operation": "exists",
                "singleValue": true
              }
            },
            {
              "id": "5f658066-2129-460b-8026-442485466d60",
              "leftValue": "={{ $json.attachments }}",
              "rightValue": "",
              "operator": {
                "type": "string",
                "operation": "exists",
                "singleValue": true
              }
            }
          ],
          "combinator": "and"
        },
        "options": {}
      },
      "type": "n8n-nodes-base.if",
      "typeVersion": 2.2,
      "position": [
        -12720,
        672
      ],
      "id": "d105223b-af71-46e9-b507-b8d3df1af610",
      "name": "¿imagen con texto?"
    },
    {
      "parameters": {
        "conditions": {
          "options": {
            "caseSensitive": true,
            "leftValue": "",
            "typeValidation": "strict",
            "version": 2
          },
          "conditions": [
            {
              "id": "7f72b70f-167b-4b22-93c4-724cc726df1b",
              "leftValue": "={{ $json.respuesta_a_mensaje }}",
              "rightValue": "",
              "operator": {
                "type": "number",
                "operation": "exists",
                "singleValue": true
              }
            }
          ],
          "combinator": "and"
        },
        "options": {}
      },
      "type": "n8n-nodes-base.if",
      "typeVersion": 2.2,
      "position": [
        -12272,
        640
      ],
      "id": "1ada3b7a-a5ac-4493-8083-9b9e0c2d78b7",
      "name": "¿respuesta a mensaje?"
    },
    {
      "parameters": {
        "url": "={{ $json.url_chatwoot }}api/v1/accounts/{{ $json.account_id }}/conversations/{{ $json.conversation_id }}/messages",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {
              "name": "api_access_token",
              "value": "={{ $json.api_key_chatwoot }}"
            }
          ]
        },
        "options": {}
      },
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        -11440,
        400
      ],
      "id": "8cc76943-8b1c-4c14-bf44-82eaddaeba8f",
      "name": "HTTP Request"
    },
    {
      "parameters": {
        "jsCode": "// 1. messagesList → array de mensajes que devolvió el GET /messages\nconst messagesList = items[0].json.payload;\n\n// 2. webhookItem → la primera vez que disparó tu Webhook ('Input')\nconst webhookItem = $items(\"Input\")[0].json;\n\n// 3. replyId → el ID al que estás respondiendo\nconst replyId = webhookItem.body.content_attributes.in_reply_to;\n\n// 4. Buscamos en el listado el mensaje original\nconst original = messagesList.find(m => m.id === replyId) || {};\n\n// 5. Devolvemos un solo item con el contenido original\nreturn [\n  {\n    json: {\n      originalMessage: original.content || null\n    }\n  }\n];\n"
      },
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        -11184,
        400
      ],
      "id": "5b38109f-adea-4e68-a299-cb8f81f88417",
      "name": "Code"
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "d861e70d-6e86-4d61-b10b-80d485805a7b",
              "name": "response",
              "value": "=Respuesta del cliente sobre el producto/mensaje ({{ $json.originalMessage }}): {{ $('Datos').item.json.texto }}",
              "type": "string"
            }
          ]
        },
        "options": {}
      },
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        -10864,
        400
      ],
      "id": "42bcd341-311a-4e08-85b3-b9572506c01e",
      "name": "response (Audio)1"
    },
    {
      "parameters": {
        "conditions": {
          "options": {
            "caseSensitive": true,
            "leftValue": "",
            "typeValidation": "strict",
            "version": 2
          },
          "conditions": [
            {
              "id": "d5335069-f81a-4ed0-a051-6a7adf506e26",
              "leftValue": "={{ $('Input').item.json.body.conversation.labels }}",
              "rightValue": "humano",
              "operator": {
                "type": "array",
                "operation": "contains",
                "rightType": "any"
              }
            }
          ],
          "combinator": "or"
        },
        "options": {}
      },
      "type": "n8n-nodes-base.if",
      "typeVersion": 2.2,
      "position": [
        -14416,
        784
      ],
      "id": "f95a1254-7ef2-4a13-be61-3d44a4ee3e49",
      "name": "¿humano?"
    },
    {
      "parameters": {
        "jsCode": "const items = $input.all();\n\nreturn items.map(item => {\n  let output = item.json.output || '';\n\n  if (typeof output === 'string') {\n    output = output\n      .replace(/\"/g, \"'\")        // Comillas dobles normales → simples\n      .replace(/[“”]/g, \"'\")     // Comillas curvas → simples\n      .replace(/\\n{2,}/g, \"\\n\")  // Saltos de línea múltiples → uno solo\n      .replace(/\\n/g, \"\\\\n\");    // Salto de línea → cadena literal \"\\n\"\n  }\n\n  return {\n    json: {\n      content: output,\n      message_type: \"outgoing\",\n      private: false\n    }\n  };\n});\n"
      },
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        -6016,
        1360
      ],
      "id": "47028970-95e9-4fd5-9023-e0e5f9ba24af",
      "name": "Formatea texto respuesta2"
    },
    {
      "parameters": {
        "method": "POST",
        "url": "={{ $('¿respuesta a mensaje?').item.json.url_chatwoot }}api/v1/accounts/1/conversations/{{ $('Input Agente').item.json.conversation_id }}/messages",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {
              "name": "api_access_token",
              "value": "={{ $('¿respuesta a mensaje?').item.json.api_key_chatwoot }}"
            },
            {
              "name": "Content-Type",
              "value": "application/json"
            }
          ]
        },
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={\n  \"content\": \"{{ $('Formatea texto respuesta').item.json.content }}\",\n  \"message_type\": \"outgoing\",\n  \"private\": false\n}\n",
        "options": {}
      },
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        -5552,
        1120
      ],
      "id": "a9d086e3-b260-4afd-8321-bce8573bbc95",
      "name": "HTTP Request4"
    },
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "b8c38fec-2010-4f93-8f6d-9aadae46e89d",
        "options": {}
      },
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 2,
      "position": [
        -16768,
        672
      ],
      "id": "59cfc9ff-476c-40ba-bf91-8ba0271629db",
      "name": "Input",
      "webhookId": "b8c38fec-2010-4f93-8f6d-9aadae46e89d"
    },
    {
      "parameters": {
        "sessionIdType": "customKey",
        "sessionKey": "={{ $('Input Agente').item.json.telefono_usuario }}1",
        "contextWindowLength": 20
      },
      "type": "@n8n/n8n-nodes-langchain.memoryPostgresChat",
      "typeVersion": 1.3,
      "position": [
        -7552,
        1088
      ],
      "id": "e79b03ae-8254-46f1-8175-7c452e409862",
      "name": "Postgres Chat Memory",
      "credentials": {
        "postgres": {
          "id": "pMwiRQzARhRemSM5",
          "name": "Postgres account"
        }
      }
    },
    {
      "parameters": {
        "promptType": "define",
        "text": "=Mensaje usuario: {{ $json.mensaje_usuario }}",
        "options": {
          "systemMessage": "=Sos el dios de la IA"
        }
      },
      "id": "03fcb80b-157d-4f59-a8a9-7fb0251d7e1f",
      "name": "AI Facu",
      "type": "@n8n/n8n-nodes-langchain.agent",
      "typeVersion": 1.7,
      "position": [
        -7536,
        816
      ],
      "retryOnFail": true,
      "onError": "continueErrorOutput"
    },
    {
      "parameters": {
        "model": "gpt-5-mini-2025-08-07",
        "options": {}
      },
      "id": "04415bd6-55fa-49d4-9550-3ad5798a23fc",
      "name": "OpenAI Model1",
      "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
      "typeVersion": 1,
      "position": [
        -7696,
        1072
      ],
      "credentials": {
        "openAiApi": {
          "id": "v9lZfFrk7pXc5Obn",
          "name": "OpenAi account"
        }
      }
    },
    {
      "parameters": {
        "workflowId": {
          "__rl": true,
          "value": "L7ixqH5aGTiS6G6a",
          "mode": "list",
          "cachedResultName": "Error"
        },
        "workflowInputs": {
          "mappingMode": "defineBelow",
          "value": {
            "telefono": "={{ $('Input Agente').item.json.telefono_usuario }}",
            "ultimomensaje": "={{ $('Input Agente').item.json.mensaje_usuario }}",
            "conversation_id": "={{ $('Input Agente').item.json.conversation_id }}"
          },
          "matchingColumns": [],
          "schema": [
            {
              "id": "telefono",
              "displayName": "telefono",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "canBeUsedToMatch": true,
              "type": "string",
              "removed": false
            },
            {
              "id": "ultimomensaje",
              "displayName": "ultimomensaje",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "canBeUsedToMatch": true,
              "type": "string",
              "removed": false
            },
            {
              "id": "conversation_id",
              "displayName": "conversation_id",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "canBeUsedToMatch": true,
              "type": "string",
              "removed": false
            }
          ],
          "attemptToConvertTypes": false,
          "convertFieldsToString": true
        },
        "options": {
          "waitForSubWorkflow": false
        }
      },
      "type": "n8n-nodes-base.executeWorkflow",
      "typeVersion": 1.2,
      "position": [
        -7040,
        912
      ],
      "id": "e289c6f2-a7d1-4214-9794-9dce3206c5d0",
      "name": "Execute Workflow"
    },
    {
      "parameters": {
        "conditions": {
          "options": {
            "caseSensitive": true,
            "leftValue": "",
            "typeValidation": "strict",
            "version": 2
          },
          "conditions": [
            {
              "id": "c71a2c90-5541-4ebf-b1bb-53e4b1fdc9bb",
              "leftValue": "={{ $json.body.message_type }}",
              "rightValue": "outgoing",
              "operator": {
                "type": "string",
                "operation": "equals",
                "name": "filter.operator.equals"
              }
            },
            {
              "id": "798d9609-63f8-4c2c-8b56-6e7e52f502cd",
              "leftValue": "={{ $json.body.private }}",
              "rightValue": "false",
              "operator": {
                "type": "boolean",
                "operation": "false",
                "singleValue": true
              }
            },
            {
              "id": "fbde7e55-b6af-4a05-bde9-9b37d9bf6786",
              "leftValue": "={{ $json.body.account.id }}",
              "rightValue": 1,
              "operator": {
                "type": "number",
                "operation": "notEquals"
              }
            }
          ],
          "combinator": "and"
        },
        "options": {}
      },
      "type": "n8n-nodes-base.if",
      "typeVersion": 2.2,
      "position": [
        -16336,
        944
      ],
      "id": "14e4dc9c-418e-4d71-a407-053e1f33bd66",
      "name": "Outgoing"
    },
    {
      "parameters": {
        "operation": "executeQuery",
        "query": "INSERT INTO public.n8n_chat_histories (session_id, message)\nVALUES \n('{{ $('Input').item.json.body.conversation.contact_inbox.source_id }}', '{\"type\": \"human\", \"content\": \"{{ $('Input').item.json.body.content }}\", \"additional_kwargs\": {}, \"response_metadata\": {}}'::jsonb);",
        "options": {}
      },
      "type": "n8n-nodes-base.postgres",
      "typeVersion": 2.6,
      "position": [
        -14176,
        496
      ],
      "id": "40541d0b-6c41-4489-b524-d5c95e9dda76",
      "name": "Agregar a memoria Agente",
      "credentials": {
        "postgres": {
          "id": "pMwiRQzARhRemSM5",
          "name": "Postgres account"
        }
      }
    },
    {
      "parameters": {
        "operation": "executeQuery",
        "query": "INSERT INTO public.n8n_chat_histories (session_id, message)\nVALUES \n('{{ $('Input').item.json.body.sender.phone_number }}', '{\"type\": \"human\", \"content\": \"{{ $('Input').item.json.body.content }}\", \"additional_kwargs\": {}, \"response_metadata\": {}}'::jsonb);",
        "options": {}
      },
      "type": "n8n-nodes-base.postgres",
      "typeVersion": 2.6,
      "position": [
        -16096,
        832
      ],
      "id": "f64b1511-0a59-44d4-aa79-d7a69bcdb356",
      "name": "Agregar a memoria Agente1",
      "credentials": {
        "postgres": {
          "id": "pMwiRQzARhRemSM5",
          "name": "Postgres account"
        }
      }
    },
    {
      "parameters": {},
      "type": "n8n-nodes-base.noOp",
      "typeVersion": 1,
      "position": [
        -16128,
        1040
      ],
      "id": "11a9c3e7-5e8b-403b-8501-f9c3d9822ec8",
      "name": "No Operation, do nothing3"
    },
    {
      "parameters": {
        "conditions": {
          "options": {
            "caseSensitive": true,
            "leftValue": "",
            "typeValidation": "strict",
            "version": 2
          },
          "conditions": [
            {
              "id": "0cc74ab1-1d5d-46f2-adf9-39fad797c7f1",
              "leftValue": "={{ $('Input').item.json.body.conversation.labels }}",
              "rightValue": "",
              "operator": {
                "type": "array",
                "operation": "notEmpty",
                "singleValue": true
              }
            }
          ],
          "combinator": "and"
        },
        "options": {}
      },
      "type": "n8n-nodes-base.if",
      "typeVersion": 2.2,
      "position": [
        -8128,
        832
      ],
      "id": "4d09663e-4851-4f76-aac3-7693e7838801",
      "name": "If6"
    },
    {
      "parameters": {
        "method": "POST",
        "url": "={{ $('Datos').item.json.url_chatwoot }}api/v1/accounts/1/conversations/{{ $('Input Agente').item.json.conversation_id }}/labels",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {
              "name": "api_access_token",
              "value": "={{ $('Datos').item.json.api_key_chatwoot }}"
            }
          ]
        },
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "{\n  \"labels\": [\n    \"lead\"\n  ]\n}",
        "options": {}
      },
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        -7920,
        976
      ],
      "id": "de06a35f-a718-4d5f-b9e9-df5dde3617a7",
      "name": "Etiquetar lead"
    },
    {
      "parameters": {
        "model": {
          "__rl": true,
          "value": "gpt-5-nano-2025-08-07",
          "mode": "list",
          "cachedResultName": "gpt-5-nano-2025-08-07"
        },
        "options": {}
      },
      "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
      "typeVersion": 1.2,
      "position": [
        -6400,
        1312
      ],
      "id": "c160b686-15c8-447f-831f-fe6e8a1e1e24",
      "name": "OpenAI Chat Model",
      "credentials": {
        "openAiApi": {
          "id": "v9lZfFrk7pXc5Obn",
          "name": "OpenAi account"
        }
      }
    }
  ],
  "pinData": {},
  "connections": {
    "Structured Output Parser": {
      "ai_outputParser": [
        [
          {
            "node": "Format Chain",
            "type": "ai_outputParser",
            "index": 0
          }
        ]
      ]
    },
    "OpenAI Chat Model2": {
      "ai_languageModel": [
        [
          {
            "node": "Format Chain",
            "type": "ai_languageModel",
            "index": 0
          }
        ]
      ]
    },
    "Format Chain": {
      "main": [
        [
          {
            "node": "Formatea texto respuesta",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Formatea texto respuesta2",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Wait": {
      "main": [
        [
          {
            "node": "2ª Parte Respuesta",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "If2": {
      "main": [
        [
          {
            "node": "Wait",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "If7",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Wait1": {
      "main": [
        [
          {
            "node": "3ª Parte Respuesta",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "If7": {
      "main": [
        [
          {
            "node": "Wait1",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "If",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Wait2": {
      "main": [
        [
          {
            "node": "4ª Parte Respuesta",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "If": {
      "main": [
        [
          {
            "node": "Wait2",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "If8",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Wait3": {
      "main": [
        [
          {
            "node": "5ª Parte Respuesta",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "If8": {
      "main": [
        [
          {
            "node": "Wait3",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Wait6": {
      "main": [
        [
          {
            "node": "Recupera mensajes",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "OpenAI1": {
      "main": [
        [
          {
            "node": "response (Audio)",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "HTTP Request13": {
      "main": [
        [
          {
            "node": "OpenAI1",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "OpenAI": {
      "main": [
        [
          {
            "node": "response (Imagen)",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Menos de 5 segundos?": {
      "main": [
        [
          {
            "node": "¿humano?",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "No Operation, do nothing",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "incoming?": {
      "main": [
        [
          {
            "node": "Tiene contenido?",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Outgoing",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Tiene contenido?": {
      "main": [
        [
          {
            "node": "Fecha actual",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "No Operation, do nothing2",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Guarda mensajes": {
      "main": [
        [
          {
            "node": "Wait6",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Recupera mensajes": {
      "main": [
        [
          {
            "node": "¿terminó de mandar mensajes?",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "¿terminó de mandar mensajes?": {
      "main": [
        [
          {
            "node": "Paquete de mensajes",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "No Operation, do nothing1",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Borra mensajes de BD": {
      "main": [
        [
          {
            "node": "Input Agente",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Calcular tiempo entre mensaje y fecha actual": {
      "main": [
        [
          {
            "node": "Menos de 5 segundos?",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Fecha actual": {
      "main": [
        [
          {
            "node": "Calcular tiempo entre mensaje y fecha actual",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Paquete de mensajes": {
      "main": [
        [
          {
            "node": "Borra mensajes de BD",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Formatea texto respuesta": {
      "main": [
        [
          {
            "node": "1ª Parte Respuesta",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "1ª Parte Respuesta": {
      "main": [
        [
          {
            "node": "If2",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "HTTP Request4",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "2ª Parte Respuesta": {
      "main": [
        [
          {
            "node": "If7",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "3ª Parte Respuesta": {
      "main": [
        [
          {
            "node": "If",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "4ª Parte Respuesta": {
      "main": [
        [
          {
            "node": "If8",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Switch": {
      "main": [
        [
          {
            "node": "HTTP Request13",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "OpenAI",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "response (PDF)",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "response (Text)",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "response": {
      "main": [
        [
          {
            "node": "Guarda mensajes",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Datos": {
      "main": [
        [
          {
            "node": "¿imagen con texto?",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "response (Audio)": {
      "main": [
        [
          {
            "node": "response",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "response (Imagen)": {
      "main": [
        [
          {
            "node": "response",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "response (PDF)": {
      "main": [
        [
          {
            "node": "response",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "response (Text)": {
      "main": [
        [
          {
            "node": "response",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "OpenAI2": {
      "main": [
        [
          {
            "node": "Guarda mensajes2",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Guarda mensajes1": {
      "main": [
        [
          {
            "node": "OpenAI2",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Recupera mensajes1": {
      "main": [
        [
          {
            "node": "Borra mensajes de BD1",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Guarda mensajes2": {
      "main": [
        [
          {
            "node": "Recupera mensajes1",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Borra mensajes de BD1": {
      "main": [
        [
          {
            "node": "response (texto/imagen)",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "response (texto/imagen)": {
      "main": [
        [
          {
            "node": "response",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Input Agente": {
      "main": [
        [
          {
            "node": "If6",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "¿imagen con texto?": {
      "main": [
        [
          {
            "node": "Guarda mensajes1",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "¿respuesta a mensaje?",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "¿respuesta a mensaje?": {
      "main": [
        [
          {
            "node": "HTTP Request",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Switch",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "HTTP Request": {
      "main": [
        [
          {
            "node": "Code",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Code": {
      "main": [
        [
          {
            "node": "response (Audio)1",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "response (Audio)1": {
      "main": [
        [
          {
            "node": "response",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "¿humano?": {
      "main": [
        [
          {
            "node": "Agregar a memoria Agente",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Datos",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Formatea texto respuesta2": {
      "main": [
        [
          {
            "node": "HTTP Request3",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Input": {
      "main": [
        [
          {
            "node": "incoming?",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Postgres Chat Memory": {
      "ai_memory": [
        [
          {
            "node": "AI Facu",
            "type": "ai_memory",
            "index": 0
          }
        ]
      ]
    },
    "OpenAI Model1": {
      "ai_languageModel": [
        [
          {
            "node": "AI Facu",
            "type": "ai_languageModel",
            "index": 0
          }
        ]
      ]
    },
    "AI Facu": {
      "main": [
        [
          {
            "node": "Format Chain",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Execute Workflow",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Outgoing": {
      "main": [
        [
          {
            "node": "Agregar a memoria Agente1",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "No Operation, do nothing3",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "If6": {
      "main": [
        [
          {
            "node": "AI Facu",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Etiquetar lead",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Etiquetar lead": {
      "main": [
        [
          {
            "node": "AI Facu",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "OpenAI Chat Model": {
      "ai_languageModel": [
        [
          {
            "node": "Structured Output Parser",
            "type": "ai_languageModel",
            "index": 0
          }
        ]
      ]
    }
  },
  "active": false,
  "settings": {
    "executionOrder": "v1"
  },
  "versionId": "a1474a87-678d-490b-9f11-f8c4217fb214",
  "meta": {
    "instanceId": "7d393e3d4387d7bfab5035e922364ae3e35b5d04683f8008433460e184f28e4c"
  },
  "id": "MKkB3avsbXn5WTDs",
  "tags": [
    {
      "createdAt": "2025-08-28T19:41:00.449Z",
      "updatedAt": "2025-08-28T19:41:00.449Z",
      "id": "VOq8t3WlVt8edbvh",
      "name": "WhatsApp"
    },
    {
      "createdAt": "2025-08-28T19:40:56.718Z",
      "updatedAt": "2025-08-28T19:40:56.718Z",
      "id": "kK8NGImTTfbMyyPW",
      "name": "Basdonax Agent"
    }
  ]
}