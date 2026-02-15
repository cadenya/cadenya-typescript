// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as Shared from './shared';
import { APIPromise } from '../core/api-promise';
import { CursorPagination, type CursorPaginationParams, PagePromise } from '../core/pagination';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

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

  servers?: Array<Document.Server>;

  specificationExtension?: Array<Document.SpecificationExtension>;

  tags?: Array<Document.Tag>;
}

export namespace Document {
  /**
   * Holds a set of reusable objects for different aspects of the OAS. All objects
   * defined within the components object will have no effect on the API unless they
   * are explicitly referenced from properties outside the components object.
   */
  export interface Components {
    callbacks?: Components.Callbacks;

    examples?: Components.Examples;

    headers?: Components.Headers;

    links?: Components.Links;

    parameters?: Components.Parameters;

    requestBodies?: Components.RequestBodies;

    responses?: Components.Responses;

    schemas?: Components.Schemas;

    securitySchemes?: Components.SecuritySchemes;

    specificationExtension?: Array<Components.SpecificationExtension>;
  }

  export namespace Components {
    export interface Callbacks {
      additionalProperties?: Array<unknown>;
    }

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
          reference?: Value.Reference;
        }

        export namespace Value {
          export interface Example {
            description?: string;

            externalValue?: string;

            specificationExtension?: Array<Example.SpecificationExtension>;

            summary?: string;

            value?: Example.Value;
          }

          export namespace Example {
            /**
             * Automatically-generated message used to represent maps of Any as ordered
             * (name,value) pairs.
             */
            export interface SpecificationExtension {
              /**
               * Map key
               */
              name?: string;

              /**
               * Mapped value
               */
              value?: SpecificationExtension.Value;
            }

            export namespace SpecificationExtension {
              /**
               * Mapped value
               */
              export interface Value {
                /**
                 * Contains an arbitrary serialized message along with a @type that describes the
                 * type of the serialized message.
                 */
                value?: Value.Value;

                yaml?: string;
              }

              export namespace Value {
                /**
                 * Contains an arbitrary serialized message along with a @type that describes the
                 * type of the serialized message.
                 */
                export interface Value {
                  /**
                   * The type of the serialized message.
                   */
                  '@type'?: string;

                  [k: string]: unknown;
                }
              }
            }

            export interface Value {
              /**
               * Contains an arbitrary serialized message along with a @type that describes the
               * type of the serialized message.
               */
              value?: Value.Value;

              yaml?: string;
            }

            export namespace Value {
              /**
               * Contains an arbitrary serialized message along with a @type that describes the
               * type of the serialized message.
               */
              export interface Value {
                /**
                 * The type of the serialized message.
                 */
                '@type'?: string;

                [k: string]: unknown;
              }
            }
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
        }
      }
    }

    export interface Headers {
      additionalProperties?: Array<unknown>;
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
          reference?: Value.Reference;
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

            parameters?: Link.Parameters;

            requestBody?: Link.RequestBody;

            /**
             * An object representing a Server.
             */
            server?: Link.Server;

            specificationExtension?: Array<Link.SpecificationExtension>;
          }

          export namespace Link {
            export interface Parameters {
              any?: Parameters.Any;

              expression?: Parameters.Expression;
            }

            export namespace Parameters {
              export interface Any {
                /**
                 * Contains an arbitrary serialized message along with a @type that describes the
                 * type of the serialized message.
                 */
                value?: Any.Value;

                yaml?: string;
              }

              export namespace Any {
                /**
                 * Contains an arbitrary serialized message along with a @type that describes the
                 * type of the serialized message.
                 */
                export interface Value {
                  /**
                   * The type of the serialized message.
                   */
                  '@type'?: string;

                  [k: string]: unknown;
                }
              }

              export interface Expression {
                additionalProperties?: Array<Expression.AdditionalProperty>;
              }

              export namespace Expression {
                /**
                 * Automatically-generated message used to represent maps of Any as ordered
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
                    /**
                     * Contains an arbitrary serialized message along with a @type that describes the
                     * type of the serialized message.
                     */
                    value?: Value.Value;

                    yaml?: string;
                  }

                  export namespace Value {
                    /**
                     * Contains an arbitrary serialized message along with a @type that describes the
                     * type of the serialized message.
                     */
                    export interface Value {
                      /**
                       * The type of the serialized message.
                       */
                      '@type'?: string;

                      [k: string]: unknown;
                    }
                  }
                }
              }
            }

            export interface RequestBody {
              any?: RequestBody.Any;

              expression?: RequestBody.Expression;
            }

            export namespace RequestBody {
              export interface Any {
                /**
                 * Contains an arbitrary serialized message along with a @type that describes the
                 * type of the serialized message.
                 */
                value?: Any.Value;

                yaml?: string;
              }

              export namespace Any {
                /**
                 * Contains an arbitrary serialized message along with a @type that describes the
                 * type of the serialized message.
                 */
                export interface Value {
                  /**
                   * The type of the serialized message.
                   */
                  '@type'?: string;

                  [k: string]: unknown;
                }
              }

              export interface Expression {
                additionalProperties?: Array<Expression.AdditionalProperty>;
              }

              export namespace Expression {
                /**
                 * Automatically-generated message used to represent maps of Any as ordered
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
                    /**
                     * Contains an arbitrary serialized message along with a @type that describes the
                     * type of the serialized message.
                     */
                    value?: Value.Value;

                    yaml?: string;
                  }

                  export namespace Value {
                    /**
                     * Contains an arbitrary serialized message along with a @type that describes the
                     * type of the serialized message.
                     */
                    export interface Value {
                      /**
                       * The type of the serialized message.
                       */
                      '@type'?: string;

                      [k: string]: unknown;
                    }
                  }
                }
              }
            }

            /**
             * An object representing a Server.
             */
            export interface Server {
              description?: string;

              specificationExtension?: Array<Server.SpecificationExtension>;

              url?: string;

              variables?: Server.Variables;
            }

            export namespace Server {
              /**
               * Automatically-generated message used to represent maps of Any as ordered
               * (name,value) pairs.
               */
              export interface SpecificationExtension {
                /**
                 * Map key
                 */
                name?: string;

                /**
                 * Mapped value
                 */
                value?: SpecificationExtension.Value;
              }

              export namespace SpecificationExtension {
                /**
                 * Mapped value
                 */
                export interface Value {
                  /**
                   * Contains an arbitrary serialized message along with a @type that describes the
                   * type of the serialized message.
                   */
                  value?: Value.Value;

                  yaml?: string;
                }

                export namespace Value {
                  /**
                   * Contains an arbitrary serialized message along with a @type that describes the
                   * type of the serialized message.
                   */
                  export interface Value {
                    /**
                     * The type of the serialized message.
                     */
                    '@type'?: string;

                    [k: string]: unknown;
                  }
                }
              }

              export interface Variables {
                additionalProperties?: Array<Variables.AdditionalProperty>;
              }

              export namespace Variables {
                /**
                 * Automatically-generated message used to represent maps of ServerVariable as
                 * ordered (name,value) pairs.
                 */
                export interface AdditionalProperty {
                  /**
                   * Map key
                   */
                  name?: string;

                  /**
                   * An object representing a Server Variable for server URL template substitution.
                   */
                  value?: AdditionalProperty.Value;
                }

                export namespace AdditionalProperty {
                  /**
                   * An object representing a Server Variable for server URL template substitution.
                   */
                  export interface Value {
                    default?: string;

                    description?: string;

                    enum?: Array<string>;

                    specificationExtension?: Array<Value.SpecificationExtension>;
                  }

                  export namespace Value {
                    /**
                     * Automatically-generated message used to represent maps of Any as ordered
                     * (name,value) pairs.
                     */
                    export interface SpecificationExtension {
                      /**
                       * Map key
                       */
                      name?: string;

                      /**
                       * Mapped value
                       */
                      value?: SpecificationExtension.Value;
                    }

                    export namespace SpecificationExtension {
                      /**
                       * Mapped value
                       */
                      export interface Value {
                        /**
                         * Contains an arbitrary serialized message along with a @type that describes the
                         * type of the serialized message.
                         */
                        value?: Value.Value;

                        yaml?: string;
                      }

                      export namespace Value {
                        /**
                         * Contains an arbitrary serialized message along with a @type that describes the
                         * type of the serialized message.
                         */
                        export interface Value {
                          /**
                           * The type of the serialized message.
                           */
                          '@type'?: string;

                          [k: string]: unknown;
                        }
                      }
                    }
                  }
                }
              }
            }

            /**
             * Automatically-generated message used to represent maps of Any as ordered
             * (name,value) pairs.
             */
            export interface SpecificationExtension {
              /**
               * Map key
               */
              name?: string;

              /**
               * Mapped value
               */
              value?: SpecificationExtension.Value;
            }

            export namespace SpecificationExtension {
              /**
               * Mapped value
               */
              export interface Value {
                /**
                 * Contains an arbitrary serialized message along with a @type that describes the
                 * type of the serialized message.
                 */
                value?: Value.Value;

                yaml?: string;
              }

              export namespace Value {
                /**
                 * Contains an arbitrary serialized message along with a @type that describes the
                 * type of the serialized message.
                 */
                export interface Value {
                  /**
                   * The type of the serialized message.
                   */
                  '@type'?: string;

                  [k: string]: unknown;
                }
              }
            }
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
          reference?: Value.Reference;
        }

        export namespace Value {
          /**
           * Describes a single operation parameter. A unique parameter is defined by a
           * combination of a name and location.
           */
          export interface Parameter {
            allowEmptyValue?: boolean;

            allowReserved?: boolean;

            content?: Parameter.Content;

            deprecated?: boolean;

            description?: string;

            example?: Parameter.Example;

            examples?: Parameter.Examples;

            explode?: boolean;

            in?: string;

            name?: string;

            required?: boolean;

            schema?: Parameter.Schema;

            specificationExtension?: Array<Parameter.SpecificationExtension>;

            style?: string;
          }

          export namespace Parameter {
            export interface Content {
              additionalProperties?: Array<unknown>;
            }

            export interface Example {
              /**
               * Contains an arbitrary serialized message along with a @type that describes the
               * type of the serialized message.
               */
              value?: Example.Value;

              yaml?: string;
            }

            export namespace Example {
              /**
               * Contains an arbitrary serialized message along with a @type that describes the
               * type of the serialized message.
               */
              export interface Value {
                /**
                 * The type of the serialized message.
                 */
                '@type'?: string;

                [k: string]: unknown;
              }
            }

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
                  reference?: Value.Reference;
                }

                export namespace Value {
                  export interface Example {
                    description?: string;

                    externalValue?: string;

                    specificationExtension?: Array<Example.SpecificationExtension>;

                    summary?: string;

                    value?: Example.Value;
                  }

                  export namespace Example {
                    /**
                     * Automatically-generated message used to represent maps of Any as ordered
                     * (name,value) pairs.
                     */
                    export interface SpecificationExtension {
                      /**
                       * Map key
                       */
                      name?: string;

                      /**
                       * Mapped value
                       */
                      value?: SpecificationExtension.Value;
                    }

                    export namespace SpecificationExtension {
                      /**
                       * Mapped value
                       */
                      export interface Value {
                        /**
                         * Contains an arbitrary serialized message along with a @type that describes the
                         * type of the serialized message.
                         */
                        value?: Value.Value;

                        yaml?: string;
                      }

                      export namespace Value {
                        /**
                         * Contains an arbitrary serialized message along with a @type that describes the
                         * type of the serialized message.
                         */
                        export interface Value {
                          /**
                           * The type of the serialized message.
                           */
                          '@type'?: string;

                          [k: string]: unknown;
                        }
                      }
                    }

                    export interface Value {
                      /**
                       * Contains an arbitrary serialized message along with a @type that describes the
                       * type of the serialized message.
                       */
                      value?: Value.Value;

                      yaml?: string;
                    }

                    export namespace Value {
                      /**
                       * Contains an arbitrary serialized message along with a @type that describes the
                       * type of the serialized message.
                       */
                      export interface Value {
                        /**
                         * The type of the serialized message.
                         */
                        '@type'?: string;

                        [k: string]: unknown;
                      }
                    }
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
                }
              }
            }

            export interface Schema {
              /**
               * A simple object to allow referencing other components in the specification,
               * internally and externally. The Reference Object is defined by JSON Reference and
               * follows the same structure, behavior and rules. For this specification,
               * reference resolution is accomplished as defined by the JSON Reference
               * specification and not by the JSON Schema specification.
               */
              reference?: Schema.Reference;

              schema?: unknown;
            }

            export namespace Schema {
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
            }

            /**
             * Automatically-generated message used to represent maps of Any as ordered
             * (name,value) pairs.
             */
            export interface SpecificationExtension {
              /**
               * Map key
               */
              name?: string;

              /**
               * Mapped value
               */
              value?: SpecificationExtension.Value;
            }

            export namespace SpecificationExtension {
              /**
               * Mapped value
               */
              export interface Value {
                /**
                 * Contains an arbitrary serialized message along with a @type that describes the
                 * type of the serialized message.
                 */
                value?: Value.Value;

                yaml?: string;
              }

              export namespace Value {
                /**
                 * Contains an arbitrary serialized message along with a @type that describes the
                 * type of the serialized message.
                 */
                export interface Value {
                  /**
                   * The type of the serialized message.
                   */
                  '@type'?: string;

                  [k: string]: unknown;
                }
              }
            }
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
          reference?: Value.Reference;

          /**
           * Describes a single request body.
           */
          requestBody?: Value.RequestBody;
        }

        export namespace Value {
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

          /**
           * Describes a single request body.
           */
          export interface RequestBody {
            content?: RequestBody.Content;

            description?: string;

            required?: boolean;

            specificationExtension?: Array<RequestBody.SpecificationExtension>;
          }

          export namespace RequestBody {
            export interface Content {
              additionalProperties?: Array<unknown>;
            }

            /**
             * Automatically-generated message used to represent maps of Any as ordered
             * (name,value) pairs.
             */
            export interface SpecificationExtension {
              /**
               * Map key
               */
              name?: string;

              /**
               * Mapped value
               */
              value?: SpecificationExtension.Value;
            }

            export namespace SpecificationExtension {
              /**
               * Mapped value
               */
              export interface Value {
                /**
                 * Contains an arbitrary serialized message along with a @type that describes the
                 * type of the serialized message.
                 */
                value?: Value.Value;

                yaml?: string;
              }

              export namespace Value {
                /**
                 * Contains an arbitrary serialized message along with a @type that describes the
                 * type of the serialized message.
                 */
                export interface Value {
                  /**
                   * The type of the serialized message.
                   */
                  '@type'?: string;

                  [k: string]: unknown;
                }
              }
            }
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
          reference?: Value.Reference;

          /**
           * Describes a single response from an API Operation, including design-time, static
           * `links` to operations based on the response.
           */
          response?: Value.Response;
        }

        export namespace Value {
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

          /**
           * Describes a single response from an API Operation, including design-time, static
           * `links` to operations based on the response.
           */
          export interface Response {
            content?: Response.Content;

            description?: string;

            headers?: Response.Headers;

            links?: Response.Links;

            specificationExtension?: Array<Response.SpecificationExtension>;
          }

          export namespace Response {
            export interface Content {
              additionalProperties?: Array<unknown>;
            }

            export interface Headers {
              additionalProperties?: Array<unknown>;
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
                  reference?: Value.Reference;
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

                    parameters?: Link.Parameters;

                    requestBody?: Link.RequestBody;

                    /**
                     * An object representing a Server.
                     */
                    server?: Link.Server;

                    specificationExtension?: Array<Link.SpecificationExtension>;
                  }

                  export namespace Link {
                    export interface Parameters {
                      any?: Parameters.Any;

                      expression?: Parameters.Expression;
                    }

                    export namespace Parameters {
                      export interface Any {
                        /**
                         * Contains an arbitrary serialized message along with a @type that describes the
                         * type of the serialized message.
                         */
                        value?: Any.Value;

                        yaml?: string;
                      }

                      export namespace Any {
                        /**
                         * Contains an arbitrary serialized message along with a @type that describes the
                         * type of the serialized message.
                         */
                        export interface Value {
                          /**
                           * The type of the serialized message.
                           */
                          '@type'?: string;

                          [k: string]: unknown;
                        }
                      }

                      export interface Expression {
                        additionalProperties?: Array<Expression.AdditionalProperty>;
                      }

                      export namespace Expression {
                        /**
                         * Automatically-generated message used to represent maps of Any as ordered
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
                            /**
                             * Contains an arbitrary serialized message along with a @type that describes the
                             * type of the serialized message.
                             */
                            value?: Value.Value;

                            yaml?: string;
                          }

                          export namespace Value {
                            /**
                             * Contains an arbitrary serialized message along with a @type that describes the
                             * type of the serialized message.
                             */
                            export interface Value {
                              /**
                               * The type of the serialized message.
                               */
                              '@type'?: string;

                              [k: string]: unknown;
                            }
                          }
                        }
                      }
                    }

                    export interface RequestBody {
                      any?: RequestBody.Any;

                      expression?: RequestBody.Expression;
                    }

                    export namespace RequestBody {
                      export interface Any {
                        /**
                         * Contains an arbitrary serialized message along with a @type that describes the
                         * type of the serialized message.
                         */
                        value?: Any.Value;

                        yaml?: string;
                      }

                      export namespace Any {
                        /**
                         * Contains an arbitrary serialized message along with a @type that describes the
                         * type of the serialized message.
                         */
                        export interface Value {
                          /**
                           * The type of the serialized message.
                           */
                          '@type'?: string;

                          [k: string]: unknown;
                        }
                      }

                      export interface Expression {
                        additionalProperties?: Array<Expression.AdditionalProperty>;
                      }

                      export namespace Expression {
                        /**
                         * Automatically-generated message used to represent maps of Any as ordered
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
                            /**
                             * Contains an arbitrary serialized message along with a @type that describes the
                             * type of the serialized message.
                             */
                            value?: Value.Value;

                            yaml?: string;
                          }

                          export namespace Value {
                            /**
                             * Contains an arbitrary serialized message along with a @type that describes the
                             * type of the serialized message.
                             */
                            export interface Value {
                              /**
                               * The type of the serialized message.
                               */
                              '@type'?: string;

                              [k: string]: unknown;
                            }
                          }
                        }
                      }
                    }

                    /**
                     * An object representing a Server.
                     */
                    export interface Server {
                      description?: string;

                      specificationExtension?: Array<Server.SpecificationExtension>;

                      url?: string;

                      variables?: Server.Variables;
                    }

                    export namespace Server {
                      /**
                       * Automatically-generated message used to represent maps of Any as ordered
                       * (name,value) pairs.
                       */
                      export interface SpecificationExtension {
                        /**
                         * Map key
                         */
                        name?: string;

                        /**
                         * Mapped value
                         */
                        value?: SpecificationExtension.Value;
                      }

                      export namespace SpecificationExtension {
                        /**
                         * Mapped value
                         */
                        export interface Value {
                          /**
                           * Contains an arbitrary serialized message along with a @type that describes the
                           * type of the serialized message.
                           */
                          value?: Value.Value;

                          yaml?: string;
                        }

                        export namespace Value {
                          /**
                           * Contains an arbitrary serialized message along with a @type that describes the
                           * type of the serialized message.
                           */
                          export interface Value {
                            /**
                             * The type of the serialized message.
                             */
                            '@type'?: string;

                            [k: string]: unknown;
                          }
                        }
                      }

                      export interface Variables {
                        additionalProperties?: Array<Variables.AdditionalProperty>;
                      }

                      export namespace Variables {
                        /**
                         * Automatically-generated message used to represent maps of ServerVariable as
                         * ordered (name,value) pairs.
                         */
                        export interface AdditionalProperty {
                          /**
                           * Map key
                           */
                          name?: string;

                          /**
                           * An object representing a Server Variable for server URL template substitution.
                           */
                          value?: AdditionalProperty.Value;
                        }

                        export namespace AdditionalProperty {
                          /**
                           * An object representing a Server Variable for server URL template substitution.
                           */
                          export interface Value {
                            default?: string;

                            description?: string;

                            enum?: Array<string>;

                            specificationExtension?: Array<Value.SpecificationExtension>;
                          }

                          export namespace Value {
                            /**
                             * Automatically-generated message used to represent maps of Any as ordered
                             * (name,value) pairs.
                             */
                            export interface SpecificationExtension {
                              /**
                               * Map key
                               */
                              name?: string;

                              /**
                               * Mapped value
                               */
                              value?: SpecificationExtension.Value;
                            }

                            export namespace SpecificationExtension {
                              /**
                               * Mapped value
                               */
                              export interface Value {
                                /**
                                 * Contains an arbitrary serialized message along with a @type that describes the
                                 * type of the serialized message.
                                 */
                                value?: Value.Value;

                                yaml?: string;
                              }

                              export namespace Value {
                                /**
                                 * Contains an arbitrary serialized message along with a @type that describes the
                                 * type of the serialized message.
                                 */
                                export interface Value {
                                  /**
                                   * The type of the serialized message.
                                   */
                                  '@type'?: string;

                                  [k: string]: unknown;
                                }
                              }
                            }
                          }
                        }
                      }
                    }

                    /**
                     * Automatically-generated message used to represent maps of Any as ordered
                     * (name,value) pairs.
                     */
                    export interface SpecificationExtension {
                      /**
                       * Map key
                       */
                      name?: string;

                      /**
                       * Mapped value
                       */
                      value?: SpecificationExtension.Value;
                    }

                    export namespace SpecificationExtension {
                      /**
                       * Mapped value
                       */
                      export interface Value {
                        /**
                         * Contains an arbitrary serialized message along with a @type that describes the
                         * type of the serialized message.
                         */
                        value?: Value.Value;

                        yaml?: string;
                      }

                      export namespace Value {
                        /**
                         * Contains an arbitrary serialized message along with a @type that describes the
                         * type of the serialized message.
                         */
                        export interface Value {
                          /**
                           * The type of the serialized message.
                           */
                          '@type'?: string;

                          [k: string]: unknown;
                        }
                      }
                    }
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
                }
              }
            }

            /**
             * Automatically-generated message used to represent maps of Any as ordered
             * (name,value) pairs.
             */
            export interface SpecificationExtension {
              /**
               * Map key
               */
              name?: string;

              /**
               * Mapped value
               */
              value?: SpecificationExtension.Value;
            }

            export namespace SpecificationExtension {
              /**
               * Mapped value
               */
              export interface Value {
                /**
                 * Contains an arbitrary serialized message along with a @type that describes the
                 * type of the serialized message.
                 */
                value?: Value.Value;

                yaml?: string;
              }

              export namespace Value {
                /**
                 * Contains an arbitrary serialized message along with a @type that describes the
                 * type of the serialized message.
                 */
                export interface Value {
                  /**
                   * The type of the serialized message.
                   */
                  '@type'?: string;

                  [k: string]: unknown;
                }
              }
            }
          }
        }
      }
    }

    export interface Schemas {
      additionalProperties?: Array<Schemas.AdditionalProperty>;
    }

    export namespace Schemas {
      /**
       * Automatically-generated message used to represent maps of SchemaOrReference as
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
        value?: unknown;
      }
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
          reference?: Value.Reference;

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

            specificationExtension?: Array<SecurityScheme.SpecificationExtension>;

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
              authorizationCode?: Flows.AuthorizationCode;

              /**
               * Configuration details for a supported OAuth Flow
               */
              clientCredentials?: Flows.ClientCredentials;

              /**
               * Configuration details for a supported OAuth Flow
               */
              implicit?: Flows.Implicit;

              /**
               * Configuration details for a supported OAuth Flow
               */
              password?: Flows.Password;

              specificationExtension?: Array<Flows.SpecificationExtension>;
            }

            export namespace Flows {
              /**
               * Configuration details for a supported OAuth Flow
               */
              export interface AuthorizationCode {
                authorizationUrl?: string;

                refreshUrl?: string;

                scopes?: AuthorizationCode.Scopes;

                specificationExtension?: Array<AuthorizationCode.SpecificationExtension>;

                tokenUrl?: string;
              }

              export namespace AuthorizationCode {
                export interface Scopes {
                  additionalProperties?: Array<Scopes.AdditionalProperty>;
                }

                export namespace Scopes {
                  /**
                   * Automatically-generated message used to represent maps of string as ordered
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
                    value?: string;
                  }
                }

                /**
                 * Automatically-generated message used to represent maps of Any as ordered
                 * (name,value) pairs.
                 */
                export interface SpecificationExtension {
                  /**
                   * Map key
                   */
                  name?: string;

                  /**
                   * Mapped value
                   */
                  value?: SpecificationExtension.Value;
                }

                export namespace SpecificationExtension {
                  /**
                   * Mapped value
                   */
                  export interface Value {
                    /**
                     * Contains an arbitrary serialized message along with a @type that describes the
                     * type of the serialized message.
                     */
                    value?: Value.Value;

                    yaml?: string;
                  }

                  export namespace Value {
                    /**
                     * Contains an arbitrary serialized message along with a @type that describes the
                     * type of the serialized message.
                     */
                    export interface Value {
                      /**
                       * The type of the serialized message.
                       */
                      '@type'?: string;

                      [k: string]: unknown;
                    }
                  }
                }
              }

              /**
               * Configuration details for a supported OAuth Flow
               */
              export interface ClientCredentials {
                authorizationUrl?: string;

                refreshUrl?: string;

                scopes?: ClientCredentials.Scopes;

                specificationExtension?: Array<ClientCredentials.SpecificationExtension>;

                tokenUrl?: string;
              }

              export namespace ClientCredentials {
                export interface Scopes {
                  additionalProperties?: Array<Scopes.AdditionalProperty>;
                }

                export namespace Scopes {
                  /**
                   * Automatically-generated message used to represent maps of string as ordered
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
                    value?: string;
                  }
                }

                /**
                 * Automatically-generated message used to represent maps of Any as ordered
                 * (name,value) pairs.
                 */
                export interface SpecificationExtension {
                  /**
                   * Map key
                   */
                  name?: string;

                  /**
                   * Mapped value
                   */
                  value?: SpecificationExtension.Value;
                }

                export namespace SpecificationExtension {
                  /**
                   * Mapped value
                   */
                  export interface Value {
                    /**
                     * Contains an arbitrary serialized message along with a @type that describes the
                     * type of the serialized message.
                     */
                    value?: Value.Value;

                    yaml?: string;
                  }

                  export namespace Value {
                    /**
                     * Contains an arbitrary serialized message along with a @type that describes the
                     * type of the serialized message.
                     */
                    export interface Value {
                      /**
                       * The type of the serialized message.
                       */
                      '@type'?: string;

                      [k: string]: unknown;
                    }
                  }
                }
              }

              /**
               * Configuration details for a supported OAuth Flow
               */
              export interface Implicit {
                authorizationUrl?: string;

                refreshUrl?: string;

                scopes?: Implicit.Scopes;

                specificationExtension?: Array<Implicit.SpecificationExtension>;

                tokenUrl?: string;
              }

              export namespace Implicit {
                export interface Scopes {
                  additionalProperties?: Array<Scopes.AdditionalProperty>;
                }

                export namespace Scopes {
                  /**
                   * Automatically-generated message used to represent maps of string as ordered
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
                    value?: string;
                  }
                }

                /**
                 * Automatically-generated message used to represent maps of Any as ordered
                 * (name,value) pairs.
                 */
                export interface SpecificationExtension {
                  /**
                   * Map key
                   */
                  name?: string;

                  /**
                   * Mapped value
                   */
                  value?: SpecificationExtension.Value;
                }

                export namespace SpecificationExtension {
                  /**
                   * Mapped value
                   */
                  export interface Value {
                    /**
                     * Contains an arbitrary serialized message along with a @type that describes the
                     * type of the serialized message.
                     */
                    value?: Value.Value;

                    yaml?: string;
                  }

                  export namespace Value {
                    /**
                     * Contains an arbitrary serialized message along with a @type that describes the
                     * type of the serialized message.
                     */
                    export interface Value {
                      /**
                       * The type of the serialized message.
                       */
                      '@type'?: string;

                      [k: string]: unknown;
                    }
                  }
                }
              }

              /**
               * Configuration details for a supported OAuth Flow
               */
              export interface Password {
                authorizationUrl?: string;

                refreshUrl?: string;

                scopes?: Password.Scopes;

                specificationExtension?: Array<Password.SpecificationExtension>;

                tokenUrl?: string;
              }

              export namespace Password {
                export interface Scopes {
                  additionalProperties?: Array<Scopes.AdditionalProperty>;
                }

                export namespace Scopes {
                  /**
                   * Automatically-generated message used to represent maps of string as ordered
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
                    value?: string;
                  }
                }

                /**
                 * Automatically-generated message used to represent maps of Any as ordered
                 * (name,value) pairs.
                 */
                export interface SpecificationExtension {
                  /**
                   * Map key
                   */
                  name?: string;

                  /**
                   * Mapped value
                   */
                  value?: SpecificationExtension.Value;
                }

                export namespace SpecificationExtension {
                  /**
                   * Mapped value
                   */
                  export interface Value {
                    /**
                     * Contains an arbitrary serialized message along with a @type that describes the
                     * type of the serialized message.
                     */
                    value?: Value.Value;

                    yaml?: string;
                  }

                  export namespace Value {
                    /**
                     * Contains an arbitrary serialized message along with a @type that describes the
                     * type of the serialized message.
                     */
                    export interface Value {
                      /**
                       * The type of the serialized message.
                       */
                      '@type'?: string;

                      [k: string]: unknown;
                    }
                  }
                }
              }

              /**
               * Automatically-generated message used to represent maps of Any as ordered
               * (name,value) pairs.
               */
              export interface SpecificationExtension {
                /**
                 * Map key
                 */
                name?: string;

                /**
                 * Mapped value
                 */
                value?: SpecificationExtension.Value;
              }

              export namespace SpecificationExtension {
                /**
                 * Mapped value
                 */
                export interface Value {
                  /**
                   * Contains an arbitrary serialized message along with a @type that describes the
                   * type of the serialized message.
                   */
                  value?: Value.Value;

                  yaml?: string;
                }

                export namespace Value {
                  /**
                   * Contains an arbitrary serialized message along with a @type that describes the
                   * type of the serialized message.
                   */
                  export interface Value {
                    /**
                     * The type of the serialized message.
                     */
                    '@type'?: string;

                    [k: string]: unknown;
                  }
                }
              }
            }

            /**
             * Automatically-generated message used to represent maps of Any as ordered
             * (name,value) pairs.
             */
            export interface SpecificationExtension {
              /**
               * Map key
               */
              name?: string;

              /**
               * Mapped value
               */
              value?: SpecificationExtension.Value;
            }

            export namespace SpecificationExtension {
              /**
               * Mapped value
               */
              export interface Value {
                /**
                 * Contains an arbitrary serialized message along with a @type that describes the
                 * type of the serialized message.
                 */
                value?: Value.Value;

                yaml?: string;
              }

              export namespace Value {
                /**
                 * Contains an arbitrary serialized message along with a @type that describes the
                 * type of the serialized message.
                 */
                export interface Value {
                  /**
                   * The type of the serialized message.
                   */
                  '@type'?: string;

                  [k: string]: unknown;
                }
              }
            }
          }
        }
      }
    }

    /**
     * Automatically-generated message used to represent maps of Any as ordered
     * (name,value) pairs.
     */
    export interface SpecificationExtension {
      /**
       * Map key
       */
      name?: string;

      /**
       * Mapped value
       */
      value?: SpecificationExtension.Value;
    }

    export namespace SpecificationExtension {
      /**
       * Mapped value
       */
      export interface Value {
        /**
         * Contains an arbitrary serialized message along with a @type that describes the
         * type of the serialized message.
         */
        value?: Value.Value;

        yaml?: string;
      }

      export namespace Value {
        /**
         * Contains an arbitrary serialized message along with a @type that describes the
         * type of the serialized message.
         */
        export interface Value {
          /**
           * The type of the serialized message.
           */
          '@type'?: string;

          [k: string]: unknown;
        }
      }
    }
  }

  /**
   * Allows referencing an external resource for extended documentation.
   */
  export interface ExternalDocs {
    description?: string;

    specificationExtension?: Array<ExternalDocs.SpecificationExtension>;

    url?: string;
  }

  export namespace ExternalDocs {
    /**
     * Automatically-generated message used to represent maps of Any as ordered
     * (name,value) pairs.
     */
    export interface SpecificationExtension {
      /**
       * Map key
       */
      name?: string;

      /**
       * Mapped value
       */
      value?: SpecificationExtension.Value;
    }

    export namespace SpecificationExtension {
      /**
       * Mapped value
       */
      export interface Value {
        /**
         * Contains an arbitrary serialized message along with a @type that describes the
         * type of the serialized message.
         */
        value?: Value.Value;

        yaml?: string;
      }

      export namespace Value {
        /**
         * Contains an arbitrary serialized message along with a @type that describes the
         * type of the serialized message.
         */
        export interface Value {
          /**
           * The type of the serialized message.
           */
          '@type'?: string;

          [k: string]: unknown;
        }
      }
    }
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

    specificationExtension?: Array<Info.SpecificationExtension>;

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

      specificationExtension?: Array<Contact.SpecificationExtension>;

      url?: string;
    }

    export namespace Contact {
      /**
       * Automatically-generated message used to represent maps of Any as ordered
       * (name,value) pairs.
       */
      export interface SpecificationExtension {
        /**
         * Map key
         */
        name?: string;

        /**
         * Mapped value
         */
        value?: SpecificationExtension.Value;
      }

      export namespace SpecificationExtension {
        /**
         * Mapped value
         */
        export interface Value {
          /**
           * Contains an arbitrary serialized message along with a @type that describes the
           * type of the serialized message.
           */
          value?: Value.Value;

          yaml?: string;
        }

        export namespace Value {
          /**
           * Contains an arbitrary serialized message along with a @type that describes the
           * type of the serialized message.
           */
          export interface Value {
            /**
             * The type of the serialized message.
             */
            '@type'?: string;

            [k: string]: unknown;
          }
        }
      }
    }

    /**
     * License information for the exposed API.
     */
    export interface License {
      name?: string;

      specificationExtension?: Array<License.SpecificationExtension>;

      url?: string;
    }

    export namespace License {
      /**
       * Automatically-generated message used to represent maps of Any as ordered
       * (name,value) pairs.
       */
      export interface SpecificationExtension {
        /**
         * Map key
         */
        name?: string;

        /**
         * Mapped value
         */
        value?: SpecificationExtension.Value;
      }

      export namespace SpecificationExtension {
        /**
         * Mapped value
         */
        export interface Value {
          /**
           * Contains an arbitrary serialized message along with a @type that describes the
           * type of the serialized message.
           */
          value?: Value.Value;

          yaml?: string;
        }

        export namespace Value {
          /**
           * Contains an arbitrary serialized message along with a @type that describes the
           * type of the serialized message.
           */
          export interface Value {
            /**
             * The type of the serialized message.
             */
            '@type'?: string;

            [k: string]: unknown;
          }
        }
      }
    }

    /**
     * Automatically-generated message used to represent maps of Any as ordered
     * (name,value) pairs.
     */
    export interface SpecificationExtension {
      /**
       * Map key
       */
      name?: string;

      /**
       * Mapped value
       */
      value?: SpecificationExtension.Value;
    }

    export namespace SpecificationExtension {
      /**
       * Mapped value
       */
      export interface Value {
        /**
         * Contains an arbitrary serialized message along with a @type that describes the
         * type of the serialized message.
         */
        value?: Value.Value;

        yaml?: string;
      }

      export namespace Value {
        /**
         * Contains an arbitrary serialized message along with a @type that describes the
         * type of the serialized message.
         */
        export interface Value {
          /**
           * The type of the serialized message.
           */
          '@type'?: string;

          [k: string]: unknown;
        }
      }
    }
  }

  /**
   * Holds the relative paths to the individual endpoints and their operations. The
   * path is appended to the URL from the `Server Object` in order to construct the
   * full URL. The Paths MAY be empty, due to ACL constraints.
   */
  export interface Paths {
    path?: Array<Paths.Path>;

    specificationExtension?: Array<Paths.SpecificationExtension>;
  }

  export namespace Paths {
    /**
     * Automatically-generated message used to represent maps of PathItem as ordered
     * (name,value) pairs.
     */
    export interface Path {
      /**
       * Map key
       */
      name?: string;

      /**
       * Mapped value
       */
      value?: unknown;
    }

    /**
     * Automatically-generated message used to represent maps of Any as ordered
     * (name,value) pairs.
     */
    export interface SpecificationExtension {
      /**
       * Map key
       */
      name?: string;

      /**
       * Mapped value
       */
      value?: SpecificationExtension.Value;
    }

    export namespace SpecificationExtension {
      /**
       * Mapped value
       */
      export interface Value {
        /**
         * Contains an arbitrary serialized message along with a @type that describes the
         * type of the serialized message.
         */
        value?: Value.Value;

        yaml?: string;
      }

      export namespace Value {
        /**
         * Contains an arbitrary serialized message along with a @type that describes the
         * type of the serialized message.
         */
        export interface Value {
          /**
           * The type of the serialized message.
           */
          '@type'?: string;

          [k: string]: unknown;
        }
      }
    }
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
   * An object representing a Server.
   */
  export interface Server {
    description?: string;

    specificationExtension?: Array<Server.SpecificationExtension>;

    url?: string;

    variables?: Server.Variables;
  }

  export namespace Server {
    /**
     * Automatically-generated message used to represent maps of Any as ordered
     * (name,value) pairs.
     */
    export interface SpecificationExtension {
      /**
       * Map key
       */
      name?: string;

      /**
       * Mapped value
       */
      value?: SpecificationExtension.Value;
    }

    export namespace SpecificationExtension {
      /**
       * Mapped value
       */
      export interface Value {
        /**
         * Contains an arbitrary serialized message along with a @type that describes the
         * type of the serialized message.
         */
        value?: Value.Value;

        yaml?: string;
      }

      export namespace Value {
        /**
         * Contains an arbitrary serialized message along with a @type that describes the
         * type of the serialized message.
         */
        export interface Value {
          /**
           * The type of the serialized message.
           */
          '@type'?: string;

          [k: string]: unknown;
        }
      }
    }

    export interface Variables {
      additionalProperties?: Array<Variables.AdditionalProperty>;
    }

    export namespace Variables {
      /**
       * Automatically-generated message used to represent maps of ServerVariable as
       * ordered (name,value) pairs.
       */
      export interface AdditionalProperty {
        /**
         * Map key
         */
        name?: string;

        /**
         * An object representing a Server Variable for server URL template substitution.
         */
        value?: AdditionalProperty.Value;
      }

      export namespace AdditionalProperty {
        /**
         * An object representing a Server Variable for server URL template substitution.
         */
        export interface Value {
          default?: string;

          description?: string;

          enum?: Array<string>;

          specificationExtension?: Array<Value.SpecificationExtension>;
        }

        export namespace Value {
          /**
           * Automatically-generated message used to represent maps of Any as ordered
           * (name,value) pairs.
           */
          export interface SpecificationExtension {
            /**
             * Map key
             */
            name?: string;

            /**
             * Mapped value
             */
            value?: SpecificationExtension.Value;
          }

          export namespace SpecificationExtension {
            /**
             * Mapped value
             */
            export interface Value {
              /**
               * Contains an arbitrary serialized message along with a @type that describes the
               * type of the serialized message.
               */
              value?: Value.Value;

              yaml?: string;
            }

            export namespace Value {
              /**
               * Contains an arbitrary serialized message along with a @type that describes the
               * type of the serialized message.
               */
              export interface Value {
                /**
                 * The type of the serialized message.
                 */
                '@type'?: string;

                [k: string]: unknown;
              }
            }
          }
        }
      }
    }
  }

  /**
   * Automatically-generated message used to represent maps of Any as ordered
   * (name,value) pairs.
   */
  export interface SpecificationExtension {
    /**
     * Map key
     */
    name?: string;

    /**
     * Mapped value
     */
    value?: SpecificationExtension.Value;
  }

  export namespace SpecificationExtension {
    /**
     * Mapped value
     */
    export interface Value {
      /**
       * Contains an arbitrary serialized message along with a @type that describes the
       * type of the serialized message.
       */
      value?: Value.Value;

      yaml?: string;
    }

    export namespace Value {
      /**
       * Contains an arbitrary serialized message along with a @type that describes the
       * type of the serialized message.
       */
      export interface Value {
        /**
         * The type of the serialized message.
         */
        '@type'?: string;

        [k: string]: unknown;
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

    specificationExtension?: Array<Tag.SpecificationExtension>;
  }

  export namespace Tag {
    /**
     * Allows referencing an external resource for extended documentation.
     */
    export interface ExternalDocs {
      description?: string;

      specificationExtension?: Array<ExternalDocs.SpecificationExtension>;

      url?: string;
    }

    export namespace ExternalDocs {
      /**
       * Automatically-generated message used to represent maps of Any as ordered
       * (name,value) pairs.
       */
      export interface SpecificationExtension {
        /**
         * Map key
         */
        name?: string;

        /**
         * Mapped value
         */
        value?: SpecificationExtension.Value;
      }

      export namespace SpecificationExtension {
        /**
         * Mapped value
         */
        export interface Value {
          /**
           * Contains an arbitrary serialized message along with a @type that describes the
           * type of the serialized message.
           */
          value?: Value.Value;

          yaml?: string;
        }

        export namespace Value {
          /**
           * Contains an arbitrary serialized message along with a @type that describes the
           * type of the serialized message.
           */
          export interface Value {
            /**
             * The type of the serialized message.
             */
            '@type'?: string;

            [k: string]: unknown;
          }
        }
      }
    }

    /**
     * Automatically-generated message used to represent maps of Any as ordered
     * (name,value) pairs.
     */
    export interface SpecificationExtension {
      /**
       * Map key
       */
      name?: string;

      /**
       * Mapped value
       */
      value?: SpecificationExtension.Value;
    }

    export namespace SpecificationExtension {
      /**
       * Mapped value
       */
      export interface Value {
        /**
         * Contains an arbitrary serialized message along with a @type that describes the
         * type of the serialized message.
         */
        value?: Value.Value;

        yaml?: string;
      }

      export namespace Value {
        /**
         * Contains an arbitrary serialized message along with a @type that describes the
         * type of the serialized message.
         */
        export interface Value {
          /**
           * The type of the serialized message.
           */
          '@type'?: string;

          [k: string]: unknown;
        }
      }
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
    type Document as Document,
    type DocumentSpec as DocumentSpec,
    type DocumentSpecInlineContent as DocumentSpecInlineContent,
    type DocumentSpecRemoteSource as DocumentSpecRemoteSource,
    type DocumentsCursorPagination as DocumentsCursorPagination,
    type DocumentCreateParams as DocumentCreateParams,
    type DocumentUpdateParams as DocumentUpdateParams,
    type DocumentListParams as DocumentListParams,
  };
}
