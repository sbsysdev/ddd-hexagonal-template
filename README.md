# DDD & Hexagonal Architecture

Propuesta de **[Clean Architecture](https://blog.cleancoder.com/uncle-bob/2011/11/22/Clean-Architecture.html)** para proyectos **frontend**, inspirada en **Domain-Driven Design ([DDD](https://en.wikipedia.org/wiki/Domain-driven_design))** & **[Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture)**.

## Estructura de carpetas *(overview)*

```bash
ddd-ports-adapters/
├── contexts/
│   ├── context/
│   │   ├── app/
│   │   │   ├── .command.ts
│   │   │   └── .query.ts
│   │   └── domain/
│   │       ├── .entity.ts
│   │       ├── .value.ts
│   │       ├── .dto.ts
│   │       ├── .repository.ts
│   │       ├── .event.ts
│   │       └── .service.ts
│   └── ... // other contexts
├── packages/
│   ├── context/
│   │   ├── app/
│   │   │   ├── emitter.ts
│   │   │   └── use-case.ts
│   │   └── domain/
│   │       ├── entity.ts
│   │       ├── error.ts
│   │       ├── response.ts
│   │       ├── event.ts
│   │       └── value-object.ts
│   ├── ui/
│   │   ├── themes/
│   │   │   ├── fonts.ts
│   │   │   ├── sizes.ts
│   │   │   ├── colors.ts
│   │   │   ├── tokens.ts
│   │   │   └── schemes.ts
│   │   ├── components/
│   │   ├── layouts/
│   │   └── ... // other ui semantic groups
│   └── ... // other packages
├── src/
│   ├── app/
│   │   ├── _layout.tsx
│   │   └── ... // other routes
│   └── modules/
│   │   ├── module/
│   │   │   ├── constants/
│   │   │   ├── controllers/
│   │   │   ├── repositories/
│   │   │   ├── stores/
│   │   │   ├── validations/
│   │   │   ├── views/
│   │   │   └── ... // other semantic groups
│   │   └── ... // other modules
├── tests/
│   ├── contexts/
│   │   ├── context/
│   │   │   ├── app/
│   │   │   └── domain/
│   │   └── ... // other contexts
│   └── ... // other tests
└── ... // others
```

### ¿Qué es DDD?

**Domain-Driven Design** es un enfoque para el desarrollo de software centrado en los conceptos del modelo de negocios. **NO** propone arquitecturas de software, ni estructuras de proyectos. **SÍ** da herramientas de análisis para diseñar y entender las entidades, flujos de información y reglas de negocio, para ser traducidos a software. Dichas entidades, flujos de información y reglas de negocio, se engloban y segmentan en grupos cuyas partes están estrechamente reacionados, a los cuales se les llama **Bounded Context**; lo cual permite crecer y desarrollar cada **contexto** de manera independiente y en paralelo, sin afectar las consideraciones únicas de cada **contexto**.

#### Definición de tipos y conceptos asociados al *contexto*

```bash
ddd-ports-adapters/
├── ... // others
├── packages/
│   ├── ddd/
│   │   ├── app/
│   │   │   ├── emitter.ts
│   │   │   └── use-case.ts
│   │   └── domain/
│   │       ├── entity.ts
│   │       ├── exception.ts
│   │       ├── response.ts
│   │       ├── event.ts
│   │       └── value-object.ts
│   └── ... // other packages
└── ... // others
```

1. [Value Object](./packages/context/domain/value-object.ts): la pieza mínima de información que representa una característica de una [Entity](./packages/context/domain/entity.ts). [Aquí](./packages/context/domain/value-object.ts) encontraremos una **interface** que debe ser implementada por cada **value object** en los diferentes **contextos**.

    Cada **value object** tiene la posibilidad de validarse en base a las **reglas de negicio** previamente establecidas, retornando una [exception](./packages/context/domain/exception.ts) controlado si dichas reglas son violadas. **NO** es responsabilidad del **value object** realizar validaciones de integridad de datos, dado que eso se debe hacer en capas superiores.

2. [Entity](./packages/context/domain/entity.ts): representa a una **entidad** identificada en el modelo de negocio, conformada por **value objects** previamente validados. También se pueden realizar validaciones de **integridad relacional** entre **value objects** al crear una **entidad**, para cumplir con reglas de negocio previamente establecidas. Una [Entity](./packages/context/domain/entity.ts) consiste en una **interface** que debe ser implementada por cada **Entity** en los diferentes **contextos**, y en una **abstract class** que puede ser extendida por cada **Entity** en los diferentes **contextos** para heredar el identificador único de la **entidad**.

    Cada **entidad** carga un **modelo raw** que funciona como **Data Transfer Object (DTO)** para permite la comunicación o transferencia a las demás capas, sin comprometer la integridad de la **entidad**.

    La principal diferencia entre una [Entity](./packages/context/domain/entity.ts) y un [Value Object](./packages/context/domain/value-object.ts) es la capacidad de existir como un **representacón única** dentro del negocio, por esa razón se identifica con un **ID único**. Otro concepto relacionado a la **Entity** es el **Aggregate**, que es un conjunto de **entidades** que por necesidades de procesos deben operarse como una única **entidad**.

3. 