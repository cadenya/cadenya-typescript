// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as DocumentsAPI from './documents';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { CursorPagination, type CursorPaginationParams, PagePromise } from '../core/pagination';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * DocumentService manages document namespaces and documents at the WORKSPACE level.
 *  Document namespaces categorize documents for use cases such as customer-specific
 *  documents, regionalized documentation, and agent-created episodic memories.
 *  Documents are key primitives of the platform containing knowledge as inline content
 *  or remote sources. Each document belongs to exactly one namespace.
 *  All operations are implicitly scoped to the workspace determined by the JWT token.
 *
 *  Authentication: Bearer token (JWT)
 *  Scope: Workspace-level operations
 */
export class Documents extends APIResource {
  /**
   * Creates a new document in the workspace within a namespace
   */
  create(body: DocumentCreateParams, options?: RequestOptions): APIPromise<Document> {
    return this._client.post('/v1/documents', { body, ...options });
  }

  /**
   * Retrieves a document by ID from the workspace
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<Document> {
    return this._client.get(path`/v1/documents/${id}`, options);
  }

  /**
   * Updates a document in the workspace
   */
  update(pathID: string, body: DocumentUpdateParams, options?: RequestOptions): APIPromise<Document> {
    return this._client.patch(path`/v1/documents/${pathID}`, { body, ...options });
  }

  /**
   * Lists all documents in the workspace, optionally filtered by namespace
   */
  list(
    query: DocumentListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<DocumentsCursorPagination, Document> {
    return this._client.getAPIList('/v1/documents', CursorPagination<Document>, { query, ...options });
  }

  /**
   * Deletes a document from the workspace
   */
  delete(id: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/documents/${id}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export type DocumentsCursorPagination = CursorPagination<Document>;

export interface Any {
  /**
   * Contains an arbitrary serialized message along with a @type that describes the
   * type of the serialized message.
   */
  value?: GoogleProtobufAny;

  yaml?: string;
}

export interface AnyOrExpression {
  any?: Any;

  expression?: Expression;
}

export interface CallbacksOrReferences {
  additionalProperties?: Array<unknown>;
}

export interface Document {
  /**
   * Holds a set of reusable objects for different aspects of the OAS. All objects
   * defined within the components object will have no effect on the API unless they
   * are explicitly referenced from properties outside the components object.
   */
  components?: Document.Components;

  /**
   * Allows referencing an external resource for extended documentation.
   */
  externalDocs?: Document.ExternalDocs;

  /**
   * The object provides metadata about the API. The metadata MAY be used by the
   * clients if needed, and MAY be presented in editing or documentation generation
   * tools for convenience.
   */
  info?: Document.Info;

  openapi?: string;

  /**
   * Holds the relative paths to the individual endpoints and their operations. The
   * path is appended to the URL from the `Server Object` in order to construct the
   * full URL. The Paths MAY be empty, due to ACL constraints.
   */
  paths?: Document.Paths;

  security?: Array<Document.Security>;

  servers?: Array<Server>;

  specificationExtension?: Array<NamedAny>;

  tags?: Array<Document.Tag>;
}

export namespace Document {
  /**
   * Holds a set of reusable objects for different aspects of the OAS. All objects
   * defined within the components object will have no effect on the API unless they
   * are explicitly referenced from properties outside the components object.
   */
  export interface Components {
    callbacks?: DocumentsAPI.CallbacksOrReferences;

    examples?: Components.Examples;

    headers?: DocumentsAPI.HeadersOrReferences;

    links?: Components.Links;

    parameters?: Components.Parameters;

    requestBodies?: Components.RequestBodies;

    responses?: Components.Responses;

    schemas?: Components.Schemas;

    securitySchemes?: Components.SecuritySchemes;

    specificationExtension?: Array<DocumentsAPI.NamedAny>;
  }

  export namespace Components {
    export interface Examples {
      additionalProperties?: Array<Examples.AdditionalProperty>;
    }

    export namespace Examples {
      /**
       * Automatically-generated message used to represent maps of ExampleOrReference as
       * ordered (name,value) pairs.
       */
      export interface AdditionalProperty {
        /**
         * Map key
         */
        name?: string;

        /**
         * Mapped value
         */
        value?: AdditionalProperty.Value;
      }

      export namespace AdditionalProperty {
        /**
         * Mapped value
         */
        export interface Value {
          example?: Value.Example;

          /**
           * A simple object to allow referencing other components in the specification,
           * internally and externally. The Reference Object is defined by JSON Reference and
           * follows the same structure, behavior and rules. For this specification,
           * reference resolution is accomplished as defined by the JSON Reference
           * specification and not by the JSON Schema specification.
           */
          reference?: DocumentsAPI.Reference;
        }

        export namespace Value {
          export interface Example {
            description?: string;

            externalValue?: string;

            specificationExtension?: Array<DocumentsAPI.NamedAny>;

            summary?: string;

            value?: DocumentsAPI.Any;
          }
        }
      }
    }

    export interface Links {
      additionalProperties?: Array<Links.AdditionalProperty>;
    }

    export namespace Links {
      /**
       * Automatically-generated message used to represent maps of LinkOrReference as
       * ordered (name,value) pairs.
       */
      export interface AdditionalProperty {
        /**
         * Map key
         */
        name?: string;

        /**
         * Mapped value
         */
        value?: AdditionalProperty.Value;
      }

      export namespace AdditionalProperty {
        /**
         * Mapped value
         */
        export interface Value {
          /**
           * The `Link object` represents a possible design-time link for a response. The
           * presence of a link does not guarantee the caller's ability to successfully
           * invoke it, rather it provides a known relationship and traversal mechanism
           * between responses and other operations. Unlike _dynamic_ links (i.e. links
           * provided **in** the response payload), the OAS linking mechanism does not
           * require link information in the runtime response. For computing links, and
           * providing instructions to execute them, a runtime expression is used for
           * accessing values in an operation and using them as parameters while invoking the
           * linked operation.
           */
          link?: Value.Link;

          /**
           * A simple object to allow referencing other components in the specification,
           * internally and externally. The Reference Object is defined by JSON Reference and
           * follows the same structure, behavior and rules. For this specification,
           * reference resolution is accomplished as defined by the JSON Reference
           * specification and not by the JSON Schema specification.
           */
          reference?: DocumentsAPI.Reference;
        }

        export namespace Value {
          /**
           * The `Link object` represents a possible design-time link for a response. The
           * presence of a link does not guarantee the caller's ability to successfully
           * invoke it, rather it provides a known relationship and traversal mechanism
           * between responses and other operations. Unlike _dynamic_ links (i.e. links
           * provided **in** the response payload), the OAS linking mechanism does not
           * require link information in the runtime response. For computing links, and
           * providing instructions to execute them, a runtime expression is used for
           * accessing values in an operation and using them as parameters while invoking the
           * linked operation.
           */
          export interface Link {
            description?: string;

            operationId?: string;

            operationRef?: string;

            parameters?: DocumentsAPI.AnyOrExpression;

            requestBody?: DocumentsAPI.AnyOrExpression;

            /**
             * An object representing a Server.
             */
            server?: DocumentsAPI.Server;

            specificationExtension?: Array<DocumentsAPI.NamedAny>;
          }
        }
      }
    }

    export interface Parameters {
      additionalProperties?: Array<Parameters.AdditionalProperty>;
    }

    export namespace Parameters {
      /**
       * Automatically-generated message used to represent maps of ParameterOrReference
       * as ordered (name,value) pairs.
       */
      export interface AdditionalProperty {
        /**
         * Map key
         */
        name?: string;

        /**
         * Mapped value
         */
        value?: AdditionalProperty.Value;
      }

      export namespace AdditionalProperty {
        /**
         * Mapped value
         */
        export interface Value {
          /**
           * Describes a single operation parameter. A unique parameter is defined by a
           * combination of a name and location.
           */
          parameter?: Value.Parameter;

          /**
           * A simple object to allow referencing other components in the specification,
           * internally and externally. The Reference Object is defined by JSON Reference and
           * follows the same structure, behavior and rules. For this specification,
           * reference resolution is accomplished as defined by the JSON Reference
           * specification and not by the JSON Schema specification.
           */
          reference?: DocumentsAPI.Reference;
        }

        export namespace Value {
          /**
           * Describes a single operation parameter. A unique parameter is defined by a
           * combination of a name and location.
           */
          export interface Parameter {
            allowEmptyValue?: boolean;

            allowReserved?: boolean;

            content?: DocumentsAPI.MediaTypes;

            deprecated?: boolean;

            description?: string;

            example?: DocumentsAPI.Any;

            examples?: Parameter.Examples;

            explode?: boolean;

            in?: string;

            name?: string;

            required?: boolean;

            schema?: DocumentsAPI.SchemaOrReference;

            specificationExtension?: Array<DocumentsAPI.NamedAny>;

            style?: string;
          }

          export namespace Parameter {
            export interface Examples {
              additionalProperties?: Array<Examples.AdditionalProperty>;
            }

            export namespace Examples {
              /**
               * Automatically-generated message used to represent maps of ExampleOrReference as
               * ordered (name,value) pairs.
               */
              export interface AdditionalProperty {
                /**
                 * Map key
                 */
                name?: string;

                /**
                 * Mapped value
                 */
                value?: AdditionalProperty.Value;
              }

              export namespace AdditionalProperty {
                /**
                 * Mapped value
                 */
                export interface Value {
                  example?: Value.Example;

                  /**
                   * A simple object to allow referencing other components in the specification,
                   * internally and externally. The Reference Object is defined by JSON Reference and
                   * follows the same structure, behavior and rules. For this specification,
                   * reference resolution is accomplished as defined by the JSON Reference
                   * specification and not by the JSON Schema specification.
                   */
                  reference?: DocumentsAPI.Reference;
                }

                export namespace Value {
                  export interface Example {
                    description?: string;

                    externalValue?: string;

                    specificationExtension?: Array<DocumentsAPI.NamedAny>;

                    summary?: string;

                    value?: DocumentsAPI.Any;
                  }
                }
              }
            }
          }
        }
      }
    }

    export interface RequestBodies {
      additionalProperties?: Array<RequestBodies.AdditionalProperty>;
    }

    export namespace RequestBodies {
      /**
       * Automatically-generated message used to represent maps of RequestBodyOrReference
       * as ordered (name,value) pairs.
       */
      export interface AdditionalProperty {
        /**
         * Map key
         */
        name?: string;

        /**
         * Mapped value
         */
        value?: AdditionalProperty.Value;
      }

      export namespace AdditionalProperty {
        /**
         * Mapped value
         */
        export interface Value {
          /**
           * A simple object to allow referencing other components in the specification,
           * internally and externally. The Reference Object is defined by JSON Reference and
           * follows the same structure, behavior and rules. For this specification,
           * reference resolution is accomplished as defined by the JSON Reference
           * specification and not by the JSON Schema specification.
           */
          reference?: DocumentsAPI.Reference;

          /**
           * Describes a single request body.
           */
          requestBody?: Value.RequestBody;
        }

        export namespace Value {
          /**
           * Describes a single request body.
           */
          export interface RequestBody {
            content?: DocumentsAPI.MediaTypes;

            description?: string;

            required?: boolean;

            specificationExtension?: Array<DocumentsAPI.NamedAny>;
          }
        }
      }
    }

    export interface Responses {
      additionalProperties?: Array<Responses.AdditionalProperty>;
    }

    export namespace Responses {
      /**
       * Automatically-generated message used to represent maps of ResponseOrReference as
       * ordered (name,value) pairs.
       */
      export interface AdditionalProperty {
        /**
         * Map key
         */
        name?: string;

        /**
         * Mapped value
         */
        value?: AdditionalProperty.Value;
      }

      export namespace AdditionalProperty {
        /**
         * Mapped value
         */
        export interface Value {
          /**
           * A simple object to allow referencing other components in the specification,
           * internally and externally. The Reference Object is defined by JSON Reference and
           * follows the same structure, behavior and rules. For this specification,
           * reference resolution is accomplished as defined by the JSON Reference
           * specification and not by the JSON Schema specification.
           */
          reference?: DocumentsAPI.Reference;

          /**
           * Describes a single response from an API Operation, including design-time, static
           * `links` to operations based on the response.
           */
          response?: Value.Response;
        }

        export namespace Value {
          /**
           * Describes a single response from an API Operation, including design-time, static
           * `links` to operations based on the response.
           */
          export interface Response {
            content?: DocumentsAPI.MediaTypes;

            description?: string;

            headers?: DocumentsAPI.HeadersOrReferences;

            links?: Response.Links;

            specificationExtension?: Array<DocumentsAPI.NamedAny>;
          }

          export namespace Response {
            export interface Links {
              additionalProperties?: Array<Links.AdditionalProperty>;
            }

            export namespace Links {
              /**
               * Automatically-generated message used to represent maps of LinkOrReference as
               * ordered (name,value) pairs.
               */
              export interface AdditionalProperty {
                /**
                 * Map key
                 */
                name?: string;

                /**
                 * Mapped value
                 */
                value?: AdditionalProperty.Value;
              }

              export namespace AdditionalProperty {
                /**
                 * Mapped value
                 */
                export interface Value {
                  /**
                   * The `Link object` represents a possible design-time link for a response. The
                   * presence of a link does not guarantee the caller's ability to successfully
                   * invoke it, rather it provides a known relationship and traversal mechanism
                   * between responses and other operations. Unlike _dynamic_ links (i.e. links
                   * provided **in** the response payload), the OAS linking mechanism does not
                   * require link information in the runtime response. For computing links, and
                   * providing instructions to execute them, a runtime expression is used for
                   * accessing values in an operation and using them as parameters while invoking the
                   * linked operation.
                   */
                  link?: Value.Link;

                  /**
                   * A simple object to allow referencing other components in the specification,
                   * internally and externally. The Reference Object is defined by JSON Reference and
                   * follows the same structure, behavior and rules. For this specification,
                   * reference resolution is accomplished as defined by the JSON Reference
                   * specification and not by the JSON Schema specification.
                   */
                  reference?: DocumentsAPI.Reference;
                }

                export namespace Value {
                  /**
                   * The `Link object` represents a possible design-time link for a response. The
                   * presence of a link does not guarantee the caller's ability to successfully
                   * invoke it, rather it provides a known relationship and traversal mechanism
                   * between responses and other operations. Unlike _dynamic_ links (i.e. links
                   * provided **in** the response payload), the OAS linking mechanism does not
                   * require link information in the runtime response. For computing links, and
                   * providing instructions to execute them, a runtime expression is used for
                   * accessing values in an operation and using them as parameters while invoking the
                   * linked operation.
                   */
                  export interface Link {
                    description?: string;

                    operationId?: string;

                    operationRef?: string;

                    parameters?: DocumentsAPI.AnyOrExpression;

                    requestBody?: DocumentsAPI.AnyOrExpression;

                    /**
                     * An object representing a Server.
                     */
                    server?: DocumentsAPI.Server;

                    specificationExtension?: Array<DocumentsAPI.NamedAny>;
                  }
                }
              }
            }
          }
        }
      }
    }

    export interface Schemas {
      additionalProperties?: Array<DocumentsAPI.NamedSchemaOrReference>;
    }

    export interface SecuritySchemes {
      additionalProperties?: Array<SecuritySchemes.AdditionalProperty>;
    }

    export namespace SecuritySchemes {
      /**
       * Automatically-generated message used to represent maps of
       * SecuritySchemeOrReference as ordered (name,value) pairs.
       */
      export interface AdditionalProperty {
        /**
         * Map key
         */
        name?: string;

        /**
         * Mapped value
         */
        value?: AdditionalProperty.Value;
      }

      export namespace AdditionalProperty {
        /**
         * Mapped value
         */
        export interface Value {
          /**
           * A simple object to allow referencing other components in the specification,
           * internally and externally. The Reference Object is defined by JSON Reference and
           * follows the same structure, behavior and rules. For this specification,
           * reference resolution is accomplished as defined by the JSON Reference
           * specification and not by the JSON Schema specification.
           */
          reference?: DocumentsAPI.Reference;

          /**
           * Defines a security scheme that can be used by the operations. Supported schemes
           * are HTTP authentication, an API key (either as a header, a cookie parameter or
           * as a query parameter), mutual TLS (use of a client certificate), OAuth2's common
           * flows (implicit, password, application and access code) as defined in RFC6749,
           * and OpenID Connect. Please note that currently (2019) the implicit flow is about
           * to be deprecated OAuth 2.0 Security Best Current Practice. Recommended for most
           * use case is Authorization Code Grant flow with PKCE.
           */
          securityScheme?: Value.SecurityScheme;
        }

        export namespace Value {
          /**
           * Defines a security scheme that can be used by the operations. Supported schemes
           * are HTTP authentication, an API key (either as a header, a cookie parameter or
           * as a query parameter), mutual TLS (use of a client certificate), OAuth2's common
           * flows (implicit, password, application and access code) as defined in RFC6749,
           * and OpenID Connect. Please note that currently (2019) the implicit flow is about
           * to be deprecated OAuth 2.0 Security Best Current Practice. Recommended for most
           * use case is Authorization Code Grant flow with PKCE.
           */
          export interface SecurityScheme {
            bearerFormat?: string;

            description?: string;

            /**
             * Allows configuration of the supported OAuth Flows.
             */
            flows?: SecurityScheme.Flows;

            in?: string;

            name?: string;

            openIdConnectUrl?: string;

            scheme?: string;

            specificationExtension?: Array<DocumentsAPI.NamedAny>;

            type?: string;
          }

          export namespace SecurityScheme {
            /**
             * Allows configuration of the supported OAuth Flows.
             */
            export interface Flows {
              /**
               * Configuration details for a supported OAuth Flow
               */
              authorizationCode?: DocumentsAPI.OAuthFlow;

              /**
               * Configuration details for a supported OAuth Flow
               */
              clientCredentials?: DocumentsAPI.OAuthFlow;

              /**
               * Configuration details for a supported OAuth Flow
               */
              implicit?: DocumentsAPI.OAuthFlow;

              /**
               * Configuration details for a supported OAuth Flow
               */
              password?: DocumentsAPI.OAuthFlow;

              specificationExtension?: Array<DocumentsAPI.NamedAny>;
            }
          }
        }
      }
    }
  }

  /**
   * Allows referencing an external resource for extended documentation.
   */
  export interface ExternalDocs {
    description?: string;

    specificationExtension?: Array<DocumentsAPI.NamedAny>;

    url?: string;
  }

  /**
   * The object provides metadata about the API. The metadata MAY be used by the
   * clients if needed, and MAY be presented in editing or documentation generation
   * tools for convenience.
   */
  export interface Info {
    /**
     * Contact information for the exposed API.
     */
    contact?: Info.Contact;

    description?: string;

    /**
     * License information for the exposed API.
     */
    license?: Info.License;

    specificationExtension?: Array<DocumentsAPI.NamedAny>;

    summary?: string;

    termsOfService?: string;

    title?: string;

    version?: string;
  }

  export namespace Info {
    /**
     * Contact information for the exposed API.
     */
    export interface Contact {
      email?: string;

      name?: string;

      specificationExtension?: Array<DocumentsAPI.NamedAny>;

      url?: string;
    }

    /**
     * License information for the exposed API.
     */
    export interface License {
      name?: string;

      specificationExtension?: Array<DocumentsAPI.NamedAny>;

      url?: string;
    }
  }

  /**
   * Holds the relative paths to the individual endpoints and their operations. The
   * path is appended to the URL from the `Server Object` in order to construct the
   * full URL. The Paths MAY be empty, due to ACL constraints.
   */
  export interface Paths {
    path?: Array<DocumentsAPI.NamedPathItem>;

    specificationExtension?: Array<DocumentsAPI.NamedAny>;
  }

  /**
   * Lists the required security schemes to execute this operation. The name used for
   * each property MUST correspond to a security scheme declared in the Security
   * Schemes under the Components Object. Security Requirement Objects that contain
   * multiple schemes require that all schemes MUST be satisfied for a request to be
   * authorized. This enables support for scenarios where multiple query parameters
   * or HTTP headers are required to convey security information. When a list of
   * Security Requirement Objects is defined on the OpenAPI Object or Operation
   * Object, only one of the Security Requirement Objects in the list needs to be
   * satisfied to authorize the request.
   */
  export interface Security {
    additionalProperties?: Array<Security.AdditionalProperty>;
  }

  export namespace Security {
    /**
     * Automatically-generated message used to represent maps of StringArray as ordered
     * (name,value) pairs.
     */
    export interface AdditionalProperty {
      /**
       * Map key
       */
      name?: string;

      /**
       * Mapped value
       */
      value?: AdditionalProperty.Value;
    }

    export namespace AdditionalProperty {
      /**
       * Mapped value
       */
      export interface Value {
        value?: Array<string>;
      }
    }
  }

  /**
   * Adds metadata to a single tag that is used by the Operation Object. It is not
   * mandatory to have a Tag Object per tag defined in the Operation Object
   * instances.
   */
  export interface Tag {
    description?: string;

    /**
     * Allows referencing an external resource for extended documentation.
     */
    externalDocs?: Tag.ExternalDocs;

    name?: string;

    specificationExtension?: Array<DocumentsAPI.NamedAny>;
  }

  export namespace Tag {
    /**
     * Allows referencing an external resource for extended documentation.
     */
    export interface ExternalDocs {
      description?: string;

      specificationExtension?: Array<DocumentsAPI.NamedAny>;

      url?: string;
    }
  }
}

/**
 * DocumentSpec defines the content and properties of a document.
 */
export interface DocumentSpec {
  /**
   * InlineContent represents content stored directly in the document.
   */
  inlineContent?: DocumentSpecInlineContent;

  /**
   * RemoteSource represents a reference to an external document.
   */
  remoteSource?: DocumentSpecRemoteSource;

  /**
   * Status of the document
   */
  status?:
    | 'DOCUMENT_STATUS_UNSPECIFIED'
    | 'DOCUMENT_STATUS_ENABLED'
    | 'DOCUMENT_STATUS_DISABLED'
    | 'DOCUMENT_STATUS_ARCHIVED';

  /**
   * Human-readable summary of what this document contains
   */
  summary?: string;

  /**
   * The type of document being stored
   */
  type?:
    | 'DOCUMENT_TYPE_UNSPECIFIED'
    | 'DOCUMENT_TYPE_EPISODIC'
    | 'DOCUMENT_TYPE_SEMANTIC'
    | 'DOCUMENT_TYPE_PROCEDURAL';
}

/**
 * InlineContent represents content stored directly in the document.
 */
export interface DocumentSpecInlineContent {
  /**
   * The actual content of the document
   */
  content?: string;

  /**
   * Length of the content in bytes (computed automatically)
   */
  length?: number;

  /**
   * MIME type of the content (e.g., "text/plain", "application/pdf")
   */
  mimeType?: string;
}

/**
 * RemoteSource represents a reference to an external document.
 */
export interface DocumentSpecRemoteSource {
  /**
   * HTTP headers to include when fetching the remote source. Useful for
   * authentication, content negotiation, etc.
   */
  headers?: { [key: string]: string };

  /**
   * HTTP method to use when fetching the remote source (e.g., "GET", "POST").
   * Defaults to GET if not specified.
   */
  method?: string;

  /**
   * URL pointing to the remote source
   */
  url?: string;
}

export interface Expression {
  additionalProperties?: Array<NamedAny>;
}

/**
 * Contains an arbitrary serialized message along with a @type that describes the
 * type of the serialized message.
 */
export interface GoogleProtobufAny {
  /**
   * The type of the serialized message.
   */
  '@type'?: string;

  [k: string]: unknown;
}

export interface HeadersOrReferences {
  additionalProperties?: Array<unknown>;
}

export interface MediaTypes {
  additionalProperties?: Array<unknown>;
}

/**
 * Automatically-generated message used to represent maps of Any as ordered
 * (name,value) pairs.
 */
export interface NamedAny {
  /**
   * Map key
   */
  name?: string;

  /**
   * Mapped value
   */
  value?: Any;
}

/**
 * Automatically-generated message used to represent maps of PathItem as ordered
 * (name,value) pairs.
 */
export interface NamedPathItem {
  /**
   * Map key
   */
  name?: string;

  /**
   * Describes the operations available on a single path. A Path Item MAY be empty,
   * due to ACL constraints. The path itself is still exposed to the documentation
   * viewer but they will not know which operations and parameters are available.
   */
  value?: unknown;
}

/**
 * Automatically-generated message used to represent maps of SchemaOrReference as
 * ordered (name,value) pairs.
 */
export interface NamedSchemaOrReference {
  /**
   * Map key
   */
  name?: string;

  /**
   * Mapped value
   */
  value?: SchemaOrReference;
}

/**
 * Automatically-generated message used to represent maps of ServerVariable as
 * ordered (name,value) pairs.
 */
export interface NamedServerVariable {
  /**
   * Map key
   */
  name?: string;

  /**
   * An object representing a Server Variable for server URL template substitution.
   */
  value?: ServerVariable;
}

/**
 * Automatically-generated message used to represent maps of string as ordered
 * (name,value) pairs.
 */
export interface NamedString {
  /**
   * Map key
   */
  name?: string;

  /**
   * Mapped value
   */
  value?: string;
}

/**
 * Configuration details for a supported OAuth Flow
 */
export interface OAuthFlow {
  authorizationUrl?: string;

  refreshUrl?: string;

  scopes?: Strings;

  specificationExtension?: Array<NamedAny>;

  tokenUrl?: string;
}

/**
 * A simple object to allow referencing other components in the specification,
 * internally and externally. The Reference Object is defined by JSON Reference and
 * follows the same structure, behavior and rules. For this specification,
 * reference resolution is accomplished as defined by the JSON Reference
 * specification and not by the JSON Schema specification.
 */
export interface Reference {
  description?: string;

  Ref?: string;

  summary?: string;
}

export interface SchemaOrReference {
  /**
   * A simple object to allow referencing other components in the specification,
   * internally and externally. The Reference Object is defined by JSON Reference and
   * follows the same structure, behavior and rules. For this specification,
   * reference resolution is accomplished as defined by the JSON Reference
   * specification and not by the JSON Schema specification.
   */
  reference?: Reference;

  /**
   * The Schema Object allows the definition of input and output data types. These
   * types can be objects, but also primitives and arrays. This object is an extended
   * subset of the JSON Schema Specification Wright Draft 00. For more information
   * about the properties, see JSON Schema Core and JSON Schema Validation. Unless
   * stated otherwise, the property definitions follow the JSON Schema.
   */
  schema?: unknown;
}

/**
 * An object representing a Server.
 */
export interface Server {
  description?: string;

  specificationExtension?: Array<NamedAny>;

  url?: string;

  variables?: ServerVariables;
}

/**
 * An object representing a Server Variable for server URL template substitution.
 */
export interface ServerVariable {
  default?: string;

  description?: string;

  enum?: Array<string>;

  specificationExtension?: Array<NamedAny>;
}

export interface ServerVariables {
  additionalProperties?: Array<NamedServerVariable>;
}

export interface Strings {
  additionalProperties?: Array<NamedString>;
}

export interface DocumentCreateParams {
  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  metadata?: Shared.ResourceMetadata;

  /**
   * The namespace this document belongs to. Each document belongs to exactly one
   * namespace.
   */
  namespaceId?: string;

  /**
   * DocumentSpec defines the content and properties of a document.
   */
  spec?: DocumentSpec;
}

export interface DocumentUpdateParams {
  /**
   * Unique identifier of the document to update
   */
  body_id?: string;

  /**
   * Standard metadata for persistent, named resources (e.g., agents, tools, prompts)
   */
  metadata?: Shared.ResourceMetadata;

  /**
   * DocumentSpec defines the content and properties of a document.
   */
  spec?: DocumentSpec;

  /**
   * Fields to update (if empty, all fields are updated)
   */
  updateMask?: string;
}

export interface DocumentListParams extends CursorPaginationParams {
  /**
   * Optional: Filter documents by namespace ID. If provided, only returns documents
   * that belong to this namespace.
   */
  namespaceId?: string;
}

export declare namespace Documents {
  export {
    type Any as Any,
    type AnyOrExpression as AnyOrExpression,
    type CallbacksOrReferences as CallbacksOrReferences,
    type Document as Document,
    type DocumentSpec as DocumentSpec,
    type DocumentSpecInlineContent as DocumentSpecInlineContent,
    type DocumentSpecRemoteSource as DocumentSpecRemoteSource,
    type Expression as Expression,
    type GoogleProtobufAny as GoogleProtobufAny,
    type HeadersOrReferences as HeadersOrReferences,
    type MediaTypes as MediaTypes,
    type NamedAny as NamedAny,
    type NamedPathItem as NamedPathItem,
    type NamedSchemaOrReference as NamedSchemaOrReference,
    type NamedServerVariable as NamedServerVariable,
    type NamedString as NamedString,
    type OAuthFlow as OAuthFlow,
    type Reference as Reference,
    type SchemaOrReference as SchemaOrReference,
    type Server as Server,
    type ServerVariable as ServerVariable,
    type ServerVariables as ServerVariables,
    type Strings as Strings,
    type DocumentsCursorPagination as DocumentsCursorPagination,
    type DocumentCreateParams as DocumentCreateParams,
    type DocumentUpdateParams as DocumentUpdateParams,
    type DocumentListParams as DocumentListParams,
  };
}
