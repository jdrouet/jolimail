# Architecture

## Sending emails

The standard architecture is by using catapulte that you host in house and jolimail.io.

```mermaid
sequenceDiagram
    participant Alice
    participant catapulte
    participant jolimail.io
    participant storage
    participant smtp

    Alice->>catapulte: Send email user_login to john@example.com

    catapulte->>jolimail.io: give me template user_login
    jolimail.io-->>catapulte: here is the template

    catapulte->>catapulte: interpolate variables

    catapulte->>storage: give me the image brand_logo
    storage-->>catapulte: done

    catapulte->>smtp: send email to john@example.com
    smtp-->>catapulte: done

    catapulte-->>Alice: done
```

## Updating templates

```mermaid
sequenceDiagram
    participant Bob
    participant jolimail.io
    participant storage

    Bob->>jolimail.io: create template user_login
    jolimail.io-->>Bob: done

    Bob->>jolimail.io: import image brand_logo
    jolimail.io->>storage: store image brand_logo
    storage-->>jolimail.io: done
    jolimail.io-->>Bob: done
```

The storage system can be:
- Minio (or anything implementing s3 api)
- local storage (file system)
