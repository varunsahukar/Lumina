/**
 * Client
 **/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types; // general types
import $Public = runtime.Types.Public;
import $Utils = runtime.Types.Utils;
import $Extensions = runtime.Types.Extensions;
import $Result = runtime.Types.Result;

export type PrismaPromise<T> = $Public.PrismaPromise<T>;

/**
 * Model User
 *
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>;
/**
 * Model Account
 *
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>;
/**
 * Model Session
 *
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>;
/**
 * Model VerificationToken
 *
 */
export type VerificationToken =
  $Result.DefaultSelection<Prisma.$VerificationTokenPayload>;
/**
 * Model Fund
 *
 */
export type Fund = $Result.DefaultSelection<Prisma.$FundPayload>;
/**
 * Model NavHistory
 *
 */
export type NavHistory = $Result.DefaultSelection<Prisma.$NavHistoryPayload>;
/**
 * Model Portfolio
 *
 */
export type Portfolio = $Result.DefaultSelection<Prisma.$PortfolioPayload>;
/**
 * Model Holding
 *
 */
export type Holding = $Result.DefaultSelection<Prisma.$HoldingPayload>;
/**
 * Model Transaction
 *
 */
export type Transaction = $Result.DefaultSelection<Prisma.$TransactionPayload>;
/**
 * Model Watchlist
 *
 */
export type Watchlist = $Result.DefaultSelection<Prisma.$WatchlistPayload>;
/**
 * Model RiskProfile
 *
 */
export type RiskProfile = $Result.DefaultSelection<Prisma.$RiskProfilePayload>;

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
    INVESTOR: 'INVESTOR';
    ADVISOR: 'ADVISOR';
    AMC: 'AMC';
    ADMIN: 'ADMIN';
    RESEARCHER: 'RESEARCHER';
  };

  export type UserRole = (typeof UserRole)[keyof typeof UserRole];

  export const KycStatus: {
    NOT_STARTED: 'NOT_STARTED';
    PENDING: 'PENDING';
    VERIFIED: 'VERIFIED';
    REJECTED: 'REJECTED';
  };

  export type KycStatus = (typeof KycStatus)[keyof typeof KycStatus];

  export const TransactionType: {
    BUY: 'BUY';
    SELL: 'SELL';
    SIP: 'SIP';
  };

  export type TransactionType =
    (typeof TransactionType)[keyof typeof TransactionType];

  export const TransactionStatus: {
    PENDING: 'PENDING';
    COMPLETED: 'COMPLETED';
    FAILED: 'FAILED';
  };

  export type TransactionStatus =
    (typeof TransactionStatus)[keyof typeof TransactionStatus];

  export const RiskCategory: {
    CONSERVATIVE: 'CONSERVATIVE';
    MODERATE: 'MODERATE';
    AGGRESSIVE: 'AGGRESSIVE';
  };

  export type RiskCategory = (typeof RiskCategory)[keyof typeof RiskCategory];
}

export type UserRole = $Enums.UserRole;

export const UserRole: typeof $Enums.UserRole;

export type KycStatus = $Enums.KycStatus;

export const KycStatus: typeof $Enums.KycStatus;

export type TransactionType = $Enums.TransactionType;

export const TransactionType: typeof $Enums.TransactionType;

export type TransactionStatus = $Enums.TransactionStatus;

export const TransactionStatus: typeof $Enums.TransactionStatus;

export type RiskCategory = $Enums.RiskCategory;

export const RiskCategory: typeof $Enums.RiskCategory;

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions
    ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition>
      ? Prisma.GetEvents<ClientOptions['log']>
      : never
    : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] };

  /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(
    optionsArg?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>,
  );
  $on<V extends U>(
    eventType: V,
    callback: (
      event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent,
    ) => void,
  ): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(
    query: string,
    ...values: any[]
  ): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(
    query: string,
    ...values: any[]
  ): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(
    arg: [...P],
    options?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    },
  ): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;

  $transaction<R>(
    fn: (
      prisma: Omit<PrismaClient, runtime.ITXClientDenyList>,
    ) => $Utils.JsPromise<R>,
    options?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    },
  ): $Utils.JsPromise<R>;

  $extends: $Extensions.ExtendsHook<
    'extends',
    Prisma.TypeMapCb<ClientOptions>,
    ExtArgs,
    $Utils.Call<
      Prisma.TypeMapCb<ClientOptions>,
      {
        extArgs: ExtArgs;
      }
    >
  >;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Accounts
   * const accounts = await prisma.account.findMany()
   * ```
   */
  get account(): Prisma.AccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Sessions
   * const sessions = await prisma.session.findMany()
   * ```
   */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.verificationToken`: Exposes CRUD operations for the **VerificationToken** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more VerificationTokens
   * const verificationTokens = await prisma.verificationToken.findMany()
   * ```
   */
  get verificationToken(): Prisma.VerificationTokenDelegate<
    ExtArgs,
    ClientOptions
  >;

  /**
   * `prisma.fund`: Exposes CRUD operations for the **Fund** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Funds
   * const funds = await prisma.fund.findMany()
   * ```
   */
  get fund(): Prisma.FundDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.navHistory`: Exposes CRUD operations for the **NavHistory** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more NavHistories
   * const navHistories = await prisma.navHistory.findMany()
   * ```
   */
  get navHistory(): Prisma.NavHistoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.portfolio`: Exposes CRUD operations for the **Portfolio** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Portfolios
   * const portfolios = await prisma.portfolio.findMany()
   * ```
   */
  get portfolio(): Prisma.PortfolioDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.holding`: Exposes CRUD operations for the **Holding** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Holdings
   * const holdings = await prisma.holding.findMany()
   * ```
   */
  get holding(): Prisma.HoldingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.transaction`: Exposes CRUD operations for the **Transaction** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Transactions
   * const transactions = await prisma.transaction.findMany()
   * ```
   */
  get transaction(): Prisma.TransactionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.watchlist`: Exposes CRUD operations for the **Watchlist** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Watchlists
   * const watchlists = await prisma.watchlist.findMany()
   * ```
   */
  get watchlist(): Prisma.WatchlistDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.riskProfile`: Exposes CRUD operations for the **RiskProfile** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more RiskProfiles
   * const riskProfiles = await prisma.riskProfile.findMany()
   * ```
   */
  get riskProfile(): Prisma.RiskProfileDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF;

  export type PrismaPromise<T> = $Public.PrismaPromise<T>;

  /**
   * Validator
   */
  export import validator = runtime.Public.validator;

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError;
  export import PrismaClientValidationError = runtime.PrismaClientValidationError;

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag;
  export import empty = runtime.empty;
  export import join = runtime.join;
  export import raw = runtime.raw;
  export import Sql = runtime.Sql;

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal;

  export type DecimalJsLike = runtime.DecimalJsLike;

  /**
   * Extensions
   */
  export import Extension = $Extensions.UserArgs;
  export import getExtensionContext = runtime.Extensions.getExtensionContext;
  export import Args = $Public.Args;
  export import Payload = $Public.Payload;
  export import Result = $Public.Result;
  export import Exact = $Public.Exact;

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string;
    engine: string;
  };

  export const prismaVersion: PrismaVersion;

  /**
   * Utility Types
   */

  export import Bytes = runtime.Bytes;
  export import JsonObject = runtime.JsonObject;
  export import JsonArray = runtime.JsonArray;
  export import JsonValue = runtime.JsonValue;
  export import InputJsonObject = runtime.InputJsonObject;
  export import InputJsonArray = runtime.InputJsonArray;
  export import InputJsonValue = runtime.InputJsonValue;

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
     * Type of `Prisma.DbNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class DbNull {
      private DbNull: never;
      private constructor();
    }

    /**
     * Type of `Prisma.JsonNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class JsonNull {
      private JsonNull: never;
      private constructor();
    }

    /**
     * Type of `Prisma.AnyNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class AnyNull {
      private AnyNull: never;
      private constructor();
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull;

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull;

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull;

  type SelectAndInclude = {
    select: any;
    include: any;
  };

  type SelectAndOmit = {
    select: any;
    omit: any;
  };

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> =
    T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<
    T extends (...args: any) => $Utils.JsPromise<any>,
  > = PromiseType<ReturnType<T>>;

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
  };

  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K;
  }[keyof T];

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K;
  };

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>;

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & (T extends SelectAndInclude
    ? 'Please either choose `select` or `include`.'
    : T extends SelectAndOmit
      ? 'Please either choose `select` or `omit`.'
      : {});

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & K;

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> = T extends object
    ? U extends object
      ? (Without<T, U> & U) | (Without<U, T> & T)
      : U
    : T;

  /**
   * Is T a Record?
   */
  type IsObject<T extends any> =
    T extends Array<any>
      ? False
      : T extends Date
        ? False
        : T extends Uint8Array
          ? False
          : T extends BigInt
            ? False
            : T extends object
              ? True
              : False;

  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O>; // With K possibilities
    }[K];

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<
    __Either<O, K>
  >;

  type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
  }[strict];

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1,
  > = O extends unknown ? _Either<O, K, strict> : never;

  export type Union = any;

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
  } & {};

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never;

  export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<
    Overwrite<
      U,
      {
        [K in keyof U]-?: At<U, K>;
      }
    >
  >;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O
    ? O[K]
    : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown
    ? AtStrict<O, K>
    : never;
  export type At<
    O extends object,
    K extends Key,
    strict extends Boolean = 1,
  > = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function
    ? A
    : {
        [K in keyof A]: A[K];
      } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
      ?
          | (K extends keyof O ? { [P in K]: O[P] } & O : O)
          | ({ [P in keyof O as P extends K ? P : never]-?: O[P] } & O)
      : never
  >;

  type _Strict<U, _U = U> = U extends unknown
    ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>>
    : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False;

  // /**
  // 1
  // */
  export type True = 1;

  /**
  0
  */
  export type False = 0;

  export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
  }[B];

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
      ? 1
      : 0;

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >;

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0;
      1: 1;
    };
    1: {
      0: 1;
      1: 1;
    };
  }[B1][B2];

  export type Keys<U extends Union> = U extends unknown ? keyof U : never;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object
    ? {
        [P in keyof T]: P extends keyof O ? O[P] : never;
      }
    : never;

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>,
  > = IsObject<T> extends True ? U : T;

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<
            UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never
          >
        : never
      : {} extends FieldPaths<T[K]>
        ? never
        : K;
  }[keyof T];

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<
    T,
    K extends Enumerable<keyof T> | keyof T,
  > = Prisma__Pick<T, MaybeTupleToUnion<K>>;

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}`
    ? never
    : T;

  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;

  type FieldRefInputType<Model, FieldType> = Model extends never
    ? never
    : FieldRef<Model, FieldType>;

  export const ModelName: {
    User: 'User';
    Account: 'Account';
    Session: 'Session';
    VerificationToken: 'VerificationToken';
    Fund: 'Fund';
    NavHistory: 'NavHistory';
    Portfolio: 'Portfolio';
    Holding: 'Holding';
    Transaction: 'Transaction';
    Watchlist: 'Watchlist';
    RiskProfile: 'RiskProfile';
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName];

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<
    { extArgs: $Extensions.InternalArgs },
    $Utils.Record<string, any>
  > {
    returns: Prisma.TypeMap<
      this['params']['extArgs'],
      ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}
    >;
  }

  export type TypeMap<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > = {
    globalOmitOptions: {
      omit: GlobalOmitOptions;
    };
    meta: {
      modelProps:
        | 'user'
        | 'account'
        | 'session'
        | 'verificationToken'
        | 'fund'
        | 'navHistory'
        | 'portfolio'
        | 'holding'
        | 'transaction'
        | 'watchlist'
        | 'riskProfile';
      txIsolationLevel: Prisma.TransactionIsolationLevel;
    };
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>;
        fields: Prisma.UserFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[];
          };
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[];
          };
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[];
          };
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateUser>;
          };
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>;
            result: $Utils.Optional<UserGroupByOutputType>[];
          };
          count: {
            args: Prisma.UserCountArgs<ExtArgs>;
            result: $Utils.Optional<UserCountAggregateOutputType> | number;
          };
        };
      };
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>;
        fields: Prisma.AccountFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>;
          };
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>;
          };
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[];
          };
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>;
          };
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[];
          };
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>;
          };
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>;
          };
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.AccountUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[];
          };
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>;
          };
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateAccount>;
          };
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>;
            result: $Utils.Optional<AccountGroupByOutputType>[];
          };
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>;
            result: $Utils.Optional<AccountCountAggregateOutputType> | number;
          };
        };
      };
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>;
        fields: Prisma.SessionFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>;
          };
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>;
          };
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[];
          };
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>;
          };
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[];
          };
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>;
          };
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>;
          };
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[];
          };
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>;
          };
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateSession>;
          };
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>;
            result: $Utils.Optional<SessionGroupByOutputType>[];
          };
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>;
            result: $Utils.Optional<SessionCountAggregateOutputType> | number;
          };
        };
      };
      VerificationToken: {
        payload: Prisma.$VerificationTokenPayload<ExtArgs>;
        fields: Prisma.VerificationTokenFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.VerificationTokenFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.VerificationTokenFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>;
          };
          findFirst: {
            args: Prisma.VerificationTokenFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.VerificationTokenFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>;
          };
          findMany: {
            args: Prisma.VerificationTokenFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[];
          };
          create: {
            args: Prisma.VerificationTokenCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>;
          };
          createMany: {
            args: Prisma.VerificationTokenCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.VerificationTokenCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[];
          };
          delete: {
            args: Prisma.VerificationTokenDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>;
          };
          update: {
            args: Prisma.VerificationTokenUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>;
          };
          deleteMany: {
            args: Prisma.VerificationTokenDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.VerificationTokenUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.VerificationTokenUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[];
          };
          upsert: {
            args: Prisma.VerificationTokenUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>;
          };
          aggregate: {
            args: Prisma.VerificationTokenAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateVerificationToken>;
          };
          groupBy: {
            args: Prisma.VerificationTokenGroupByArgs<ExtArgs>;
            result: $Utils.Optional<VerificationTokenGroupByOutputType>[];
          };
          count: {
            args: Prisma.VerificationTokenCountArgs<ExtArgs>;
            result:
              | $Utils.Optional<VerificationTokenCountAggregateOutputType>
              | number;
          };
        };
      };
      Fund: {
        payload: Prisma.$FundPayload<ExtArgs>;
        fields: Prisma.FundFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.FundFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$FundPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.FundFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$FundPayload>;
          };
          findFirst: {
            args: Prisma.FundFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$FundPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.FundFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$FundPayload>;
          };
          findMany: {
            args: Prisma.FundFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$FundPayload>[];
          };
          create: {
            args: Prisma.FundCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$FundPayload>;
          };
          createMany: {
            args: Prisma.FundCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.FundCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$FundPayload>[];
          };
          delete: {
            args: Prisma.FundDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$FundPayload>;
          };
          update: {
            args: Prisma.FundUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$FundPayload>;
          };
          deleteMany: {
            args: Prisma.FundDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.FundUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.FundUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$FundPayload>[];
          };
          upsert: {
            args: Prisma.FundUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$FundPayload>;
          };
          aggregate: {
            args: Prisma.FundAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateFund>;
          };
          groupBy: {
            args: Prisma.FundGroupByArgs<ExtArgs>;
            result: $Utils.Optional<FundGroupByOutputType>[];
          };
          count: {
            args: Prisma.FundCountArgs<ExtArgs>;
            result: $Utils.Optional<FundCountAggregateOutputType> | number;
          };
        };
      };
      NavHistory: {
        payload: Prisma.$NavHistoryPayload<ExtArgs>;
        fields: Prisma.NavHistoryFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.NavHistoryFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$NavHistoryPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.NavHistoryFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$NavHistoryPayload>;
          };
          findFirst: {
            args: Prisma.NavHistoryFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$NavHistoryPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.NavHistoryFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$NavHistoryPayload>;
          };
          findMany: {
            args: Prisma.NavHistoryFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$NavHistoryPayload>[];
          };
          create: {
            args: Prisma.NavHistoryCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$NavHistoryPayload>;
          };
          createMany: {
            args: Prisma.NavHistoryCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.NavHistoryCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$NavHistoryPayload>[];
          };
          delete: {
            args: Prisma.NavHistoryDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$NavHistoryPayload>;
          };
          update: {
            args: Prisma.NavHistoryUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$NavHistoryPayload>;
          };
          deleteMany: {
            args: Prisma.NavHistoryDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.NavHistoryUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.NavHistoryUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$NavHistoryPayload>[];
          };
          upsert: {
            args: Prisma.NavHistoryUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$NavHistoryPayload>;
          };
          aggregate: {
            args: Prisma.NavHistoryAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateNavHistory>;
          };
          groupBy: {
            args: Prisma.NavHistoryGroupByArgs<ExtArgs>;
            result: $Utils.Optional<NavHistoryGroupByOutputType>[];
          };
          count: {
            args: Prisma.NavHistoryCountArgs<ExtArgs>;
            result:
              | $Utils.Optional<NavHistoryCountAggregateOutputType>
              | number;
          };
        };
      };
      Portfolio: {
        payload: Prisma.$PortfolioPayload<ExtArgs>;
        fields: Prisma.PortfolioFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.PortfolioFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.PortfolioFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>;
          };
          findFirst: {
            args: Prisma.PortfolioFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.PortfolioFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>;
          };
          findMany: {
            args: Prisma.PortfolioFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>[];
          };
          create: {
            args: Prisma.PortfolioCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>;
          };
          createMany: {
            args: Prisma.PortfolioCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.PortfolioCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>[];
          };
          delete: {
            args: Prisma.PortfolioDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>;
          };
          update: {
            args: Prisma.PortfolioUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>;
          };
          deleteMany: {
            args: Prisma.PortfolioDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.PortfolioUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.PortfolioUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>[];
          };
          upsert: {
            args: Prisma.PortfolioUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$PortfolioPayload>;
          };
          aggregate: {
            args: Prisma.PortfolioAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregatePortfolio>;
          };
          groupBy: {
            args: Prisma.PortfolioGroupByArgs<ExtArgs>;
            result: $Utils.Optional<PortfolioGroupByOutputType>[];
          };
          count: {
            args: Prisma.PortfolioCountArgs<ExtArgs>;
            result: $Utils.Optional<PortfolioCountAggregateOutputType> | number;
          };
        };
      };
      Holding: {
        payload: Prisma.$HoldingPayload<ExtArgs>;
        fields: Prisma.HoldingFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.HoldingFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$HoldingPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.HoldingFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$HoldingPayload>;
          };
          findFirst: {
            args: Prisma.HoldingFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$HoldingPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.HoldingFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$HoldingPayload>;
          };
          findMany: {
            args: Prisma.HoldingFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$HoldingPayload>[];
          };
          create: {
            args: Prisma.HoldingCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$HoldingPayload>;
          };
          createMany: {
            args: Prisma.HoldingCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.HoldingCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$HoldingPayload>[];
          };
          delete: {
            args: Prisma.HoldingDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$HoldingPayload>;
          };
          update: {
            args: Prisma.HoldingUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$HoldingPayload>;
          };
          deleteMany: {
            args: Prisma.HoldingDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.HoldingUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.HoldingUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$HoldingPayload>[];
          };
          upsert: {
            args: Prisma.HoldingUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$HoldingPayload>;
          };
          aggregate: {
            args: Prisma.HoldingAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateHolding>;
          };
          groupBy: {
            args: Prisma.HoldingGroupByArgs<ExtArgs>;
            result: $Utils.Optional<HoldingGroupByOutputType>[];
          };
          count: {
            args: Prisma.HoldingCountArgs<ExtArgs>;
            result: $Utils.Optional<HoldingCountAggregateOutputType> | number;
          };
        };
      };
      Transaction: {
        payload: Prisma.$TransactionPayload<ExtArgs>;
        fields: Prisma.TransactionFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.TransactionFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.TransactionFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>;
          };
          findFirst: {
            args: Prisma.TransactionFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.TransactionFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>;
          };
          findMany: {
            args: Prisma.TransactionFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[];
          };
          create: {
            args: Prisma.TransactionCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>;
          };
          createMany: {
            args: Prisma.TransactionCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.TransactionCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[];
          };
          delete: {
            args: Prisma.TransactionDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>;
          };
          update: {
            args: Prisma.TransactionUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>;
          };
          deleteMany: {
            args: Prisma.TransactionDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.TransactionUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.TransactionUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[];
          };
          upsert: {
            args: Prisma.TransactionUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>;
          };
          aggregate: {
            args: Prisma.TransactionAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateTransaction>;
          };
          groupBy: {
            args: Prisma.TransactionGroupByArgs<ExtArgs>;
            result: $Utils.Optional<TransactionGroupByOutputType>[];
          };
          count: {
            args: Prisma.TransactionCountArgs<ExtArgs>;
            result:
              | $Utils.Optional<TransactionCountAggregateOutputType>
              | number;
          };
        };
      };
      Watchlist: {
        payload: Prisma.$WatchlistPayload<ExtArgs>;
        fields: Prisma.WatchlistFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.WatchlistFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WatchlistPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.WatchlistFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WatchlistPayload>;
          };
          findFirst: {
            args: Prisma.WatchlistFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WatchlistPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.WatchlistFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WatchlistPayload>;
          };
          findMany: {
            args: Prisma.WatchlistFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WatchlistPayload>[];
          };
          create: {
            args: Prisma.WatchlistCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WatchlistPayload>;
          };
          createMany: {
            args: Prisma.WatchlistCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.WatchlistCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WatchlistPayload>[];
          };
          delete: {
            args: Prisma.WatchlistDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WatchlistPayload>;
          };
          update: {
            args: Prisma.WatchlistUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WatchlistPayload>;
          };
          deleteMany: {
            args: Prisma.WatchlistDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.WatchlistUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.WatchlistUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WatchlistPayload>[];
          };
          upsert: {
            args: Prisma.WatchlistUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$WatchlistPayload>;
          };
          aggregate: {
            args: Prisma.WatchlistAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateWatchlist>;
          };
          groupBy: {
            args: Prisma.WatchlistGroupByArgs<ExtArgs>;
            result: $Utils.Optional<WatchlistGroupByOutputType>[];
          };
          count: {
            args: Prisma.WatchlistCountArgs<ExtArgs>;
            result: $Utils.Optional<WatchlistCountAggregateOutputType> | number;
          };
        };
      };
      RiskProfile: {
        payload: Prisma.$RiskProfilePayload<ExtArgs>;
        fields: Prisma.RiskProfileFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.RiskProfileFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RiskProfilePayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.RiskProfileFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RiskProfilePayload>;
          };
          findFirst: {
            args: Prisma.RiskProfileFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RiskProfilePayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.RiskProfileFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RiskProfilePayload>;
          };
          findMany: {
            args: Prisma.RiskProfileFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RiskProfilePayload>[];
          };
          create: {
            args: Prisma.RiskProfileCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RiskProfilePayload>;
          };
          createMany: {
            args: Prisma.RiskProfileCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.RiskProfileCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RiskProfilePayload>[];
          };
          delete: {
            args: Prisma.RiskProfileDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RiskProfilePayload>;
          };
          update: {
            args: Prisma.RiskProfileUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RiskProfilePayload>;
          };
          deleteMany: {
            args: Prisma.RiskProfileDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.RiskProfileUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.RiskProfileUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RiskProfilePayload>[];
          };
          upsert: {
            args: Prisma.RiskProfileUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RiskProfilePayload>;
          };
          aggregate: {
            args: Prisma.RiskProfileAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateRiskProfile>;
          };
          groupBy: {
            args: Prisma.RiskProfileGroupByArgs<ExtArgs>;
            result: $Utils.Optional<RiskProfileGroupByOutputType>[];
          };
          count: {
            args: Prisma.RiskProfileCountArgs<ExtArgs>;
            result:
              | $Utils.Optional<RiskProfileCountAggregateOutputType>
              | number;
          };
        };
      };
    };
  } & {
    other: {
      payload: any;
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
      };
    };
  };
  export const defineExtension: $Extensions.ExtendsHook<
    'define',
    Prisma.TypeMapCb,
    $Extensions.DefaultArgs
  >;
  export type DefaultPrismaClient = PrismaClient;
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat;
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     *
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     *
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     *
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[];
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    };
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory;
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string;
    /**
     * Global configuration for omitting model fields by default.
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig;
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[];
  }
  export type GlobalOmitConfig = {
    user?: UserOmit;
    account?: AccountOmit;
    session?: SessionOmit;
    verificationToken?: VerificationTokenOmit;
    fund?: FundOmit;
    navHistory?: NavHistoryOmit;
    portfolio?: PortfolioOmit;
    holding?: HoldingOmit;
    transaction?: TransactionOmit;
    watchlist?: WatchlistOmit;
    riskProfile?: RiskProfileOmit;
  };

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error';
  export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
  };

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> =
    T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;

  export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
  };

  export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
  };
  /* End Types for Logging */

  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy';

  // tested in getLogLevel.test.ts
  export function getLogLevel(
    log: Array<LogLevel | LogDefinition>,
  ): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<
    Prisma.DefaultPrismaClient,
    runtime.ITXClientDenyList
  >;

  export type Datasource = {
    url?: string;
  };

  /**
   * Count Types
   */

  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    accounts: number;
    sessions: number;
    portfolios: number;
    transactions: number;
    watchlist: number;
  };

  export type UserCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs;
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs;
    portfolios?: boolean | UserCountOutputTypeCountPortfoliosArgs;
    transactions?: boolean | UserCountOutputTypeCountTransactionsArgs;
    watchlist?: boolean | UserCountOutputTypeCountWatchlistArgs;
  };

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: AccountWhereInput;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: SessionWhereInput;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPortfoliosArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: PortfolioWhereInput;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTransactionsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: TransactionWhereInput;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountWatchlistArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: WatchlistWhereInput;
  };

  /**
   * Count Type FundCountOutputType
   */

  export type FundCountOutputType = {
    navHistory: number;
    holdings: number;
    transactions: number;
    watchlist: number;
  };

  export type FundCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    navHistory?: boolean | FundCountOutputTypeCountNavHistoryArgs;
    holdings?: boolean | FundCountOutputTypeCountHoldingsArgs;
    transactions?: boolean | FundCountOutputTypeCountTransactionsArgs;
    watchlist?: boolean | FundCountOutputTypeCountWatchlistArgs;
  };

  // Custom InputTypes
  /**
   * FundCountOutputType without action
   */
  export type FundCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the FundCountOutputType
     */
    select?: FundCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * FundCountOutputType without action
   */
  export type FundCountOutputTypeCountNavHistoryArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: NavHistoryWhereInput;
  };

  /**
   * FundCountOutputType without action
   */
  export type FundCountOutputTypeCountHoldingsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: HoldingWhereInput;
  };

  /**
   * FundCountOutputType without action
   */
  export type FundCountOutputTypeCountTransactionsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: TransactionWhereInput;
  };

  /**
   * FundCountOutputType without action
   */
  export type FundCountOutputTypeCountWatchlistArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: WatchlistWhereInput;
  };

  /**
   * Count Type PortfolioCountOutputType
   */

  export type PortfolioCountOutputType = {
    holdings: number;
  };

  export type PortfolioCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    holdings?: boolean | PortfolioCountOutputTypeCountHoldingsArgs;
  };

  // Custom InputTypes
  /**
   * PortfolioCountOutputType without action
   */
  export type PortfolioCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the PortfolioCountOutputType
     */
    select?: PortfolioCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * PortfolioCountOutputType without action
   */
  export type PortfolioCountOutputTypeCountHoldingsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: HoldingWhereInput;
  };

  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
  };

  export type UserMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    password: string | null;
    image: string | null;
    role: $Enums.UserRole | null;
    kycStatus: $Enums.KycStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type UserMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    password: string | null;
    image: string | null;
    role: $Enums.UserRole | null;
    kycStatus: $Enums.KycStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type UserCountAggregateOutputType = {
    id: number;
    name: number;
    email: number;
    emailVerified: number;
    password: number;
    image: number;
    role: number;
    kycStatus: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type UserMinAggregateInputType = {
    id?: true;
    name?: true;
    email?: true;
    emailVerified?: true;
    password?: true;
    image?: true;
    role?: true;
    kycStatus?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type UserMaxAggregateInputType = {
    id?: true;
    name?: true;
    email?: true;
    emailVerified?: true;
    password?: true;
    image?: true;
    role?: true;
    kycStatus?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type UserCountAggregateInputType = {
    id?: true;
    name?: true;
    email?: true;
    emailVerified?: true;
    password?: true;
    image?: true;
    role?: true;
    kycStatus?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type UserAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Users
     **/
    _count?: true | UserCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: UserMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: UserMaxAggregateInputType;
  };

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
    [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>;
  };

  export type UserGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: UserWhereInput;
    orderBy?:
      | UserOrderByWithAggregationInput
      | UserOrderByWithAggregationInput[];
    by: UserScalarFieldEnum[] | UserScalarFieldEnum;
    having?: UserScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserCountAggregateInputType | true;
    _min?: UserMinAggregateInputType;
    _max?: UserMaxAggregateInputType;
  };

  export type UserGroupByOutputType = {
    id: string;
    name: string | null;
    email: string;
    emailVerified: Date | null;
    password: string | null;
    image: string | null;
    role: $Enums.UserRole;
    kycStatus: $Enums.KycStatus;
    createdAt: Date;
    updatedAt: Date;
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
  };

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> & {
        [P in keyof T & keyof UserGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], UserGroupByOutputType[P]>
          : GetScalarType<T[P], UserGroupByOutputType[P]>;
      }
    >
  >;

  export type UserSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      email?: boolean;
      emailVerified?: boolean;
      password?: boolean;
      image?: boolean;
      role?: boolean;
      kycStatus?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      riskProfile?: boolean | User$riskProfileArgs<ExtArgs>;
      accounts?: boolean | User$accountsArgs<ExtArgs>;
      sessions?: boolean | User$sessionsArgs<ExtArgs>;
      portfolios?: boolean | User$portfoliosArgs<ExtArgs>;
      transactions?: boolean | User$transactionsArgs<ExtArgs>;
      watchlist?: boolean | User$watchlistArgs<ExtArgs>;
      _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['user']
  >;

  export type UserSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      email?: boolean;
      emailVerified?: boolean;
      password?: boolean;
      image?: boolean;
      role?: boolean;
      kycStatus?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['user']
  >;

  export type UserSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      email?: boolean;
      emailVerified?: boolean;
      password?: boolean;
      image?: boolean;
      role?: boolean;
      kycStatus?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['user']
  >;

  export type UserSelectScalar = {
    id?: boolean;
    name?: boolean;
    email?: boolean;
    emailVerified?: boolean;
    password?: boolean;
    image?: boolean;
    role?: boolean;
    kycStatus?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type UserOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    | 'id'
    | 'name'
    | 'email'
    | 'emailVerified'
    | 'password'
    | 'image'
    | 'role'
    | 'kycStatus'
    | 'createdAt'
    | 'updatedAt',
    ExtArgs['result']['user']
  >;
  export type UserInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    riskProfile?: boolean | User$riskProfileArgs<ExtArgs>;
    accounts?: boolean | User$accountsArgs<ExtArgs>;
    sessions?: boolean | User$sessionsArgs<ExtArgs>;
    portfolios?: boolean | User$portfoliosArgs<ExtArgs>;
    transactions?: boolean | User$transactionsArgs<ExtArgs>;
    watchlist?: boolean | User$watchlistArgs<ExtArgs>;
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type UserIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};
  export type UserIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};

  export type $UserPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'User';
    objects: {
      riskProfile: Prisma.$RiskProfilePayload<ExtArgs> | null;
      accounts: Prisma.$AccountPayload<ExtArgs>[];
      sessions: Prisma.$SessionPayload<ExtArgs>[];
      portfolios: Prisma.$PortfolioPayload<ExtArgs>[];
      transactions: Prisma.$TransactionPayload<ExtArgs>[];
      watchlist: Prisma.$WatchlistPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        name: string | null;
        email: string;
        emailVerified: Date | null;
        password: string | null;
        image: string | null;
        role: $Enums.UserRole;
        kycStatus: $Enums.KycStatus;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs['result']['user']
    >;
    composites: {};
  };

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> =
    $Result.GetResult<Prisma.$UserPayload, S>;

  type UserCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UserCountAggregateInputType | true;
  };

  export interface UserDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['User'];
      meta: { name: 'User' };
    };
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(
      args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(
      args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(
      args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     *
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     *
     */
    findMany<T extends UserFindManyArgs>(
      args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        'findMany',
        GlobalOmitOptions
      >
    >;

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     *
     */
    create<T extends UserCreateArgs>(
      args: SelectSubset<T, UserCreateArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        'create',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends UserCreateManyArgs>(
      args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(
      args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     *
     */
    delete<T extends UserDeleteArgs>(
      args: SelectSubset<T, UserDeleteArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        'delete',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends UserUpdateArgs>(
      args: SelectSubset<T, UserUpdateArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        'update',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends UserDeleteManyArgs>(
      args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends UserUpdateManyArgs>(
      args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(
      args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(
      args: SelectSubset<T, UserUpsertArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        'upsert',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
     **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends UserAggregateArgs>(
      args: Subset<T, UserAggregateArgs>,
    ): Prisma.PrismaPromise<GetUserAggregateType<T>>;

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      'Field ',
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetUserGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the User model
     */
    readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    riskProfile<T extends User$riskProfileArgs<ExtArgs> = {}>(
      args?: Subset<T, User$riskProfileArgs<ExtArgs>>,
    ): Prisma__RiskProfileClient<
      $Result.GetResult<
        Prisma.$RiskProfilePayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;
    accounts<T extends User$accountsArgs<ExtArgs> = {}>(
      args?: Subset<T, User$accountsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$AccountPayload<ExtArgs>,
          T,
          'findMany',
          GlobalOmitOptions
        >
      | Null
    >;
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(
      args?: Subset<T, User$sessionsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$SessionPayload<ExtArgs>,
          T,
          'findMany',
          GlobalOmitOptions
        >
      | Null
    >;
    portfolios<T extends User$portfoliosArgs<ExtArgs> = {}>(
      args?: Subset<T, User$portfoliosArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$PortfolioPayload<ExtArgs>,
          T,
          'findMany',
          GlobalOmitOptions
        >
      | Null
    >;
    transactions<T extends User$transactionsArgs<ExtArgs> = {}>(
      args?: Subset<T, User$transactionsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$TransactionPayload<ExtArgs>,
          T,
          'findMany',
          GlobalOmitOptions
        >
      | Null
    >;
    watchlist<T extends User$watchlistArgs<ExtArgs> = {}>(
      args?: Subset<T, User$watchlistArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$WatchlistPayload<ExtArgs>,
          T,
          'findMany',
          GlobalOmitOptions
        >
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<'User', 'String'>;
    readonly name: FieldRef<'User', 'String'>;
    readonly email: FieldRef<'User', 'String'>;
    readonly emailVerified: FieldRef<'User', 'DateTime'>;
    readonly password: FieldRef<'User', 'String'>;
    readonly image: FieldRef<'User', 'String'>;
    readonly role: FieldRef<'User', 'UserRole'>;
    readonly kycStatus: FieldRef<'User', 'KycStatus'>;
    readonly createdAt: FieldRef<'User', 'DateTime'>;
    readonly updatedAt: FieldRef<'User', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
  };

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
  };

  /**
   * User findMany
   */
  export type UserFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
  };

  /**
   * User create
   */
  export type UserCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>;
  };

  /**
   * User createMany
   */
  export type UserCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * User update
   */
  export type UserUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>;
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput;
    /**
     * Limit how many Users to update.
     */
    limit?: number;
  };

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput;
    /**
     * Limit how many Users to update.
     */
    limit?: number;
  };

  /**
   * User upsert
   */
  export type UserUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput;
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>;
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>;
  };

  /**
   * User delete
   */
  export type UserDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput;
    /**
     * Limit how many Users to delete.
     */
    limit?: number;
  };

  /**
   * User.riskProfile
   */
  export type User$riskProfileArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RiskProfile
     */
    select?: RiskProfileSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RiskProfile
     */
    omit?: RiskProfileOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiskProfileInclude<ExtArgs> | null;
    where?: RiskProfileWhereInput;
  };

  /**
   * User.accounts
   */
  export type User$accountsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null;
    where?: AccountWhereInput;
    orderBy?:
      | AccountOrderByWithRelationInput
      | AccountOrderByWithRelationInput[];
    cursor?: AccountWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[];
  };

  /**
   * User.sessions
   */
  export type User$sessionsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    where?: SessionWhereInput;
    orderBy?:
      | SessionOrderByWithRelationInput
      | SessionOrderByWithRelationInput[];
    cursor?: SessionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[];
  };

  /**
   * User.portfolios
   */
  export type User$portfoliosArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null;
    where?: PortfolioWhereInput;
    orderBy?:
      | PortfolioOrderByWithRelationInput
      | PortfolioOrderByWithRelationInput[];
    cursor?: PortfolioWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: PortfolioScalarFieldEnum | PortfolioScalarFieldEnum[];
  };

  /**
   * User.transactions
   */
  export type User$transactionsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null;
    where?: TransactionWhereInput;
    orderBy?:
      | TransactionOrderByWithRelationInput
      | TransactionOrderByWithRelationInput[];
    cursor?: TransactionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[];
  };

  /**
   * User.watchlist
   */
  export type User$watchlistArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Watchlist
     */
    select?: WatchlistSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Watchlist
     */
    omit?: WatchlistOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistInclude<ExtArgs> | null;
    where?: WatchlistWhereInput;
    orderBy?:
      | WatchlistOrderByWithRelationInput
      | WatchlistOrderByWithRelationInput[];
    cursor?: WatchlistWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: WatchlistScalarFieldEnum | WatchlistScalarFieldEnum[];
  };

  /**
   * User without action
   */
  export type UserDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
  };

  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null;
    _avg: AccountAvgAggregateOutputType | null;
    _sum: AccountSumAggregateOutputType | null;
    _min: AccountMinAggregateOutputType | null;
    _max: AccountMaxAggregateOutputType | null;
  };

  export type AccountAvgAggregateOutputType = {
    expires_at: number | null;
  };

  export type AccountSumAggregateOutputType = {
    expires_at: number | null;
  };

  export type AccountMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    type: string | null;
    provider: string | null;
    providerAccountId: string | null;
    refresh_token: string | null;
    access_token: string | null;
    expires_at: number | null;
    token_type: string | null;
    scope: string | null;
    id_token: string | null;
    session_state: string | null;
  };

  export type AccountMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    type: string | null;
    provider: string | null;
    providerAccountId: string | null;
    refresh_token: string | null;
    access_token: string | null;
    expires_at: number | null;
    token_type: string | null;
    scope: string | null;
    id_token: string | null;
    session_state: string | null;
  };

  export type AccountCountAggregateOutputType = {
    id: number;
    userId: number;
    type: number;
    provider: number;
    providerAccountId: number;
    refresh_token: number;
    access_token: number;
    expires_at: number;
    token_type: number;
    scope: number;
    id_token: number;
    session_state: number;
    _all: number;
  };

  export type AccountAvgAggregateInputType = {
    expires_at?: true;
  };

  export type AccountSumAggregateInputType = {
    expires_at?: true;
  };

  export type AccountMinAggregateInputType = {
    id?: true;
    userId?: true;
    type?: true;
    provider?: true;
    providerAccountId?: true;
    refresh_token?: true;
    access_token?: true;
    expires_at?: true;
    token_type?: true;
    scope?: true;
    id_token?: true;
    session_state?: true;
  };

  export type AccountMaxAggregateInputType = {
    id?: true;
    userId?: true;
    type?: true;
    provider?: true;
    providerAccountId?: true;
    refresh_token?: true;
    access_token?: true;
    expires_at?: true;
    token_type?: true;
    scope?: true;
    id_token?: true;
    session_state?: true;
  };

  export type AccountCountAggregateInputType = {
    id?: true;
    userId?: true;
    type?: true;
    provider?: true;
    providerAccountId?: true;
    refresh_token?: true;
    access_token?: true;
    expires_at?: true;
    token_type?: true;
    scope?: true;
    id_token?: true;
    session_state?: true;
    _all?: true;
  };

  export type AccountAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Accounts to fetch.
     */
    orderBy?:
      | AccountOrderByWithRelationInput
      | AccountOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Accounts.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Accounts
     **/
    _count?: true | AccountCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: AccountAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: AccountSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: AccountMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: AccountMaxAggregateInputType;
  };

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
    [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>;
  };

  export type AccountGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: AccountWhereInput;
    orderBy?:
      | AccountOrderByWithAggregationInput
      | AccountOrderByWithAggregationInput[];
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum;
    having?: AccountScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AccountCountAggregateInputType | true;
    _avg?: AccountAvgAggregateInputType;
    _sum?: AccountSumAggregateInputType;
    _min?: AccountMinAggregateInputType;
    _max?: AccountMaxAggregateInputType;
  };

  export type AccountGroupByOutputType = {
    id: string;
    userId: string;
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token: string | null;
    access_token: string | null;
    expires_at: number | null;
    token_type: string | null;
    scope: string | null;
    id_token: string | null;
    session_state: string | null;
    _count: AccountCountAggregateOutputType | null;
    _avg: AccountAvgAggregateOutputType | null;
    _sum: AccountSumAggregateOutputType | null;
    _min: AccountMinAggregateOutputType | null;
    _max: AccountMaxAggregateOutputType | null;
  };

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<AccountGroupByOutputType, T['by']> & {
          [P in keyof T & keyof AccountGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>;
        }
      >
    >;

  export type AccountSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      type?: boolean;
      provider?: boolean;
      providerAccountId?: boolean;
      refresh_token?: boolean;
      access_token?: boolean;
      expires_at?: boolean;
      token_type?: boolean;
      scope?: boolean;
      id_token?: boolean;
      session_state?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['account']
  >;

  export type AccountSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      type?: boolean;
      provider?: boolean;
      providerAccountId?: boolean;
      refresh_token?: boolean;
      access_token?: boolean;
      expires_at?: boolean;
      token_type?: boolean;
      scope?: boolean;
      id_token?: boolean;
      session_state?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['account']
  >;

  export type AccountSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      type?: boolean;
      provider?: boolean;
      providerAccountId?: boolean;
      refresh_token?: boolean;
      access_token?: boolean;
      expires_at?: boolean;
      token_type?: boolean;
      scope?: boolean;
      id_token?: boolean;
      session_state?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['account']
  >;

  export type AccountSelectScalar = {
    id?: boolean;
    userId?: boolean;
    type?: boolean;
    provider?: boolean;
    providerAccountId?: boolean;
    refresh_token?: boolean;
    access_token?: boolean;
    expires_at?: boolean;
    token_type?: boolean;
    scope?: boolean;
    id_token?: boolean;
    session_state?: boolean;
  };

  export type AccountOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    | 'id'
    | 'userId'
    | 'type'
    | 'provider'
    | 'providerAccountId'
    | 'refresh_token'
    | 'access_token'
    | 'expires_at'
    | 'token_type'
    | 'scope'
    | 'id_token'
    | 'session_state',
    ExtArgs['result']['account']
  >;
  export type AccountInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type AccountIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type AccountIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };

  export type $AccountPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'Account';
    objects: {
      user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        userId: string;
        type: string;
        provider: string;
        providerAccountId: string;
        refresh_token: string | null;
        access_token: string | null;
        expires_at: number | null;
        token_type: string | null;
        scope: string | null;
        id_token: string | null;
        session_state: string | null;
      },
      ExtArgs['result']['account']
    >;
    composites: {};
  };

  type AccountGetPayload<
    S extends boolean | null | undefined | AccountDefaultArgs,
  > = $Result.GetResult<Prisma.$AccountPayload, S>;

  type AccountCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AccountCountAggregateInputType | true;
  };

  export interface AccountDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['Account'];
      meta: { name: 'Account' };
    };
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(
      args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>,
    ): Prisma__AccountClient<
      $Result.GetResult<
        Prisma.$AccountPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(
      args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__AccountClient<
      $Result.GetResult<
        Prisma.$AccountPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(
      args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>,
    ): Prisma__AccountClient<
      $Result.GetResult<
        Prisma.$AccountPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(
      args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__AccountClient<
      $Result.GetResult<
        Prisma.$AccountPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     *
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     *
     */
    findMany<T extends AccountFindManyArgs>(
      args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$AccountPayload<ExtArgs>,
        T,
        'findMany',
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     *
     */
    create<T extends AccountCreateArgs>(
      args: SelectSubset<T, AccountCreateArgs<ExtArgs>>,
    ): Prisma__AccountClient<
      $Result.GetResult<
        Prisma.$AccountPayload<ExtArgs>,
        T,
        'create',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends AccountCreateManyArgs>(
      args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(
      args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$AccountPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     *
     */
    delete<T extends AccountDeleteArgs>(
      args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>,
    ): Prisma__AccountClient<
      $Result.GetResult<
        Prisma.$AccountPayload<ExtArgs>,
        T,
        'delete',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends AccountUpdateArgs>(
      args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>,
    ): Prisma__AccountClient<
      $Result.GetResult<
        Prisma.$AccountPayload<ExtArgs>,
        T,
        'update',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends AccountDeleteManyArgs>(
      args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends AccountUpdateManyArgs>(
      args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Accounts and returns the data updated in the database.
     * @param {AccountUpdateManyAndReturnArgs} args - Arguments to update many Accounts.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends AccountUpdateManyAndReturnArgs>(
      args: SelectSubset<T, AccountUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$AccountPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(
      args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>,
    ): Prisma__AccountClient<
      $Result.GetResult<
        Prisma.$AccountPayload<ExtArgs>,
        T,
        'upsert',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
     **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends AccountAggregateArgs>(
      args: Subset<T, AccountAggregateArgs>,
    ): Prisma.PrismaPromise<GetAccountAggregateType<T>>;

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      'Field ',
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetAccountGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Account model
     */
    readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    user<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>,
    ): Prisma__UserClient<
      | $Result.GetResult<
          Prisma.$UserPayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Account model
   */
  interface AccountFieldRefs {
    readonly id: FieldRef<'Account', 'String'>;
    readonly userId: FieldRef<'Account', 'String'>;
    readonly type: FieldRef<'Account', 'String'>;
    readonly provider: FieldRef<'Account', 'String'>;
    readonly providerAccountId: FieldRef<'Account', 'String'>;
    readonly refresh_token: FieldRef<'Account', 'String'>;
    readonly access_token: FieldRef<'Account', 'String'>;
    readonly expires_at: FieldRef<'Account', 'Int'>;
    readonly token_type: FieldRef<'Account', 'String'>;
    readonly scope: FieldRef<'Account', 'String'>;
    readonly id_token: FieldRef<'Account', 'String'>;
    readonly session_state: FieldRef<'Account', 'String'>;
  }

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null;
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput;
  };

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null;
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput;
  };

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null;
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Accounts to fetch.
     */
    orderBy?:
      | AccountOrderByWithRelationInput
      | AccountOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Accounts.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[];
  };

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null;
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Accounts to fetch.
     */
    orderBy?:
      | AccountOrderByWithRelationInput
      | AccountOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Accounts.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[];
  };

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null;
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Accounts to fetch.
     */
    orderBy?:
      | AccountOrderByWithRelationInput
      | AccountOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Accounts.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[];
  };

  /**
   * Account create
   */
  export type AccountCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null;
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>;
  };

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Account createManyAndReturn
   */
  export type AccountCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null;
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Account update
   */
  export type AccountUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null;
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>;
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput;
  };

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>;
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput;
    /**
     * Limit how many Accounts to update.
     */
    limit?: number;
  };

  /**
   * Account updateManyAndReturn
   */
  export type AccountUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null;
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>;
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput;
    /**
     * Limit how many Accounts to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null;
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput;
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>;
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>;
  };

  /**
   * Account delete
   */
  export type AccountDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null;
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput;
  };

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput;
    /**
     * Limit how many Accounts to delete.
     */
    limit?: number;
  };

  /**
   * Account without action
   */
  export type AccountDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null;
  };

  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null;
    _min: SessionMinAggregateOutputType | null;
    _max: SessionMaxAggregateOutputType | null;
  };

  export type SessionMinAggregateOutputType = {
    id: string | null;
    sessionToken: string | null;
    userId: string | null;
    expires: Date | null;
  };

  export type SessionMaxAggregateOutputType = {
    id: string | null;
    sessionToken: string | null;
    userId: string | null;
    expires: Date | null;
  };

  export type SessionCountAggregateOutputType = {
    id: number;
    sessionToken: number;
    userId: number;
    expires: number;
    _all: number;
  };

  export type SessionMinAggregateInputType = {
    id?: true;
    sessionToken?: true;
    userId?: true;
    expires?: true;
  };

  export type SessionMaxAggregateInputType = {
    id?: true;
    sessionToken?: true;
    userId?: true;
    expires?: true;
  };

  export type SessionCountAggregateInputType = {
    id?: true;
    sessionToken?: true;
    userId?: true;
    expires?: true;
    _all?: true;
  };

  export type SessionAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Sessions to fetch.
     */
    orderBy?:
      | SessionOrderByWithRelationInput
      | SessionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Sessions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Sessions
     **/
    _count?: true | SessionCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: SessionMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: SessionMaxAggregateInputType;
  };

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
    [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>;
  };

  export type SessionGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: SessionWhereInput;
    orderBy?:
      | SessionOrderByWithAggregationInput
      | SessionOrderByWithAggregationInput[];
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum;
    having?: SessionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SessionCountAggregateInputType | true;
    _min?: SessionMinAggregateInputType;
    _max?: SessionMaxAggregateInputType;
  };

  export type SessionGroupByOutputType = {
    id: string;
    sessionToken: string;
    userId: string;
    expires: Date;
    _count: SessionCountAggregateOutputType | null;
    _min: SessionMinAggregateOutputType | null;
    _max: SessionMaxAggregateOutputType | null;
  };

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<SessionGroupByOutputType, T['by']> & {
          [P in keyof T & keyof SessionGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>;
        }
      >
    >;

  export type SessionSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      sessionToken?: boolean;
      userId?: boolean;
      expires?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['session']
  >;

  export type SessionSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      sessionToken?: boolean;
      userId?: boolean;
      expires?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['session']
  >;

  export type SessionSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      sessionToken?: boolean;
      userId?: boolean;
      expires?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['session']
  >;

  export type SessionSelectScalar = {
    id?: boolean;
    sessionToken?: boolean;
    userId?: boolean;
    expires?: boolean;
  };

  export type SessionOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    'id' | 'sessionToken' | 'userId' | 'expires',
    ExtArgs['result']['session']
  >;
  export type SessionInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type SessionIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type SessionIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };

  export type $SessionPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'Session';
    objects: {
      user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        sessionToken: string;
        userId: string;
        expires: Date;
      },
      ExtArgs['result']['session']
    >;
    composites: {};
  };

  type SessionGetPayload<
    S extends boolean | null | undefined | SessionDefaultArgs,
  > = $Result.GetResult<Prisma.$SessionPayload, S>;

  type SessionCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SessionCountAggregateInputType | true;
  };

  export interface SessionDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['Session'];
      meta: { name: 'Session' };
    };
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(
      args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>,
    ): Prisma__SessionClient<
      $Result.GetResult<
        Prisma.$SessionPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(
      args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__SessionClient<
      $Result.GetResult<
        Prisma.$SessionPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(
      args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>,
    ): Prisma__SessionClient<
      $Result.GetResult<
        Prisma.$SessionPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(
      args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__SessionClient<
      $Result.GetResult<
        Prisma.$SessionPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     *
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     *
     */
    findMany<T extends SessionFindManyArgs>(
      args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$SessionPayload<ExtArgs>,
        T,
        'findMany',
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     *
     */
    create<T extends SessionCreateArgs>(
      args: SelectSubset<T, SessionCreateArgs<ExtArgs>>,
    ): Prisma__SessionClient<
      $Result.GetResult<
        Prisma.$SessionPayload<ExtArgs>,
        T,
        'create',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends SessionCreateManyArgs>(
      args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(
      args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$SessionPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     *
     */
    delete<T extends SessionDeleteArgs>(
      args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>,
    ): Prisma__SessionClient<
      $Result.GetResult<
        Prisma.$SessionPayload<ExtArgs>,
        T,
        'delete',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends SessionUpdateArgs>(
      args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>,
    ): Prisma__SessionClient<
      $Result.GetResult<
        Prisma.$SessionPayload<ExtArgs>,
        T,
        'update',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends SessionDeleteManyArgs>(
      args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends SessionUpdateManyArgs>(
      args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(
      args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$SessionPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(
      args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>,
    ): Prisma__SessionClient<
      $Result.GetResult<
        Prisma.$SessionPayload<ExtArgs>,
        T,
        'upsert',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
     **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends SessionAggregateArgs>(
      args: Subset<T, SessionAggregateArgs>,
    ): Prisma.PrismaPromise<GetSessionAggregateType<T>>;

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      'Field ',
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetSessionGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Session model
     */
    readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    user<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>,
    ): Prisma__UserClient<
      | $Result.GetResult<
          Prisma.$UserPayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<'Session', 'String'>;
    readonly sessionToken: FieldRef<'Session', 'String'>;
    readonly userId: FieldRef<'Session', 'String'>;
    readonly expires: FieldRef<'Session', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput;
  };

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput;
  };

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Sessions to fetch.
     */
    orderBy?:
      | SessionOrderByWithRelationInput
      | SessionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Sessions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[];
  };

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Sessions to fetch.
     */
    orderBy?:
      | SessionOrderByWithRelationInput
      | SessionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Sessions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[];
  };

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Sessions to fetch.
     */
    orderBy?:
      | SessionOrderByWithRelationInput
      | SessionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Sessions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[];
  };

  /**
   * Session create
   */
  export type SessionCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>;
  };

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Session update
   */
  export type SessionUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>;
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput;
  };

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>;
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput;
    /**
     * Limit how many Sessions to update.
     */
    limit?: number;
  };

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>;
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput;
    /**
     * Limit how many Sessions to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput;
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>;
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>;
  };

  /**
   * Session delete
   */
  export type SessionDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput;
  };

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput;
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number;
  };

  /**
   * Session without action
   */
  export type SessionDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
  };

  /**
   * Model VerificationToken
   */

  export type AggregateVerificationToken = {
    _count: VerificationTokenCountAggregateOutputType | null;
    _min: VerificationTokenMinAggregateOutputType | null;
    _max: VerificationTokenMaxAggregateOutputType | null;
  };

  export type VerificationTokenMinAggregateOutputType = {
    identifier: string | null;
    token: string | null;
    expires: Date | null;
  };

  export type VerificationTokenMaxAggregateOutputType = {
    identifier: string | null;
    token: string | null;
    expires: Date | null;
  };

  export type VerificationTokenCountAggregateOutputType = {
    identifier: number;
    token: number;
    expires: number;
    _all: number;
  };

  export type VerificationTokenMinAggregateInputType = {
    identifier?: true;
    token?: true;
    expires?: true;
  };

  export type VerificationTokenMaxAggregateInputType = {
    identifier?: true;
    token?: true;
    expires?: true;
  };

  export type VerificationTokenCountAggregateInputType = {
    identifier?: true;
    token?: true;
    expires?: true;
    _all?: true;
  };

  export type VerificationTokenAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which VerificationToken to aggregate.
     */
    where?: VerificationTokenWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?:
      | VerificationTokenOrderByWithRelationInput
      | VerificationTokenOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: VerificationTokenWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` VerificationTokens.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned VerificationTokens
     **/
    _count?: true | VerificationTokenCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: VerificationTokenMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: VerificationTokenMaxAggregateInputType;
  };

  export type GetVerificationTokenAggregateType<
    T extends VerificationTokenAggregateArgs,
  > = {
    [P in keyof T & keyof AggregateVerificationToken]: P extends
      | '_count'
      | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerificationToken[P]>
      : GetScalarType<T[P], AggregateVerificationToken[P]>;
  };

  export type VerificationTokenGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: VerificationTokenWhereInput;
    orderBy?:
      | VerificationTokenOrderByWithAggregationInput
      | VerificationTokenOrderByWithAggregationInput[];
    by: VerificationTokenScalarFieldEnum[] | VerificationTokenScalarFieldEnum;
    having?: VerificationTokenScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: VerificationTokenCountAggregateInputType | true;
    _min?: VerificationTokenMinAggregateInputType;
    _max?: VerificationTokenMaxAggregateInputType;
  };

  export type VerificationTokenGroupByOutputType = {
    identifier: string;
    token: string;
    expires: Date;
    _count: VerificationTokenCountAggregateOutputType | null;
    _min: VerificationTokenMinAggregateOutputType | null;
    _max: VerificationTokenMaxAggregateOutputType | null;
  };

  type GetVerificationTokenGroupByPayload<
    T extends VerificationTokenGroupByArgs,
  > = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationTokenGroupByOutputType, T['by']> & {
        [P in keyof T &
          keyof VerificationTokenGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
          : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>;
      }
    >
  >;

  export type VerificationTokenSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      identifier?: boolean;
      token?: boolean;
      expires?: boolean;
    },
    ExtArgs['result']['verificationToken']
  >;

  export type VerificationTokenSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      identifier?: boolean;
      token?: boolean;
      expires?: boolean;
    },
    ExtArgs['result']['verificationToken']
  >;

  export type VerificationTokenSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      identifier?: boolean;
      token?: boolean;
      expires?: boolean;
    },
    ExtArgs['result']['verificationToken']
  >;

  export type VerificationTokenSelectScalar = {
    identifier?: boolean;
    token?: boolean;
    expires?: boolean;
  };

  export type VerificationTokenOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    'identifier' | 'token' | 'expires',
    ExtArgs['result']['verificationToken']
  >;

  export type $VerificationTokenPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'VerificationToken';
    objects: {};
    scalars: $Extensions.GetPayloadResult<
      {
        identifier: string;
        token: string;
        expires: Date;
      },
      ExtArgs['result']['verificationToken']
    >;
    composites: {};
  };

  type VerificationTokenGetPayload<
    S extends boolean | null | undefined | VerificationTokenDefaultArgs,
  > = $Result.GetResult<Prisma.$VerificationTokenPayload, S>;

  type VerificationTokenCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<
    VerificationTokenFindManyArgs,
    'select' | 'include' | 'distinct' | 'omit'
  > & {
    select?: VerificationTokenCountAggregateInputType | true;
  };

  export interface VerificationTokenDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['VerificationToken'];
      meta: { name: 'VerificationToken' };
    };
    /**
     * Find zero or one VerificationToken that matches the filter.
     * @param {VerificationTokenFindUniqueArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VerificationTokenFindUniqueArgs>(
      args: SelectSubset<T, VerificationTokenFindUniqueArgs<ExtArgs>>,
    ): Prisma__VerificationTokenClient<
      $Result.GetResult<
        Prisma.$VerificationTokenPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one VerificationToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VerificationTokenFindUniqueOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VerificationTokenFindUniqueOrThrowArgs>(
      args: SelectSubset<T, VerificationTokenFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__VerificationTokenClient<
      $Result.GetResult<
        Prisma.$VerificationTokenPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first VerificationToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VerificationTokenFindFirstArgs>(
      args?: SelectSubset<T, VerificationTokenFindFirstArgs<ExtArgs>>,
    ): Prisma__VerificationTokenClient<
      $Result.GetResult<
        Prisma.$VerificationTokenPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first VerificationToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VerificationTokenFindFirstOrThrowArgs>(
      args?: SelectSubset<T, VerificationTokenFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__VerificationTokenClient<
      $Result.GetResult<
        Prisma.$VerificationTokenPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more VerificationTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany()
     *
     * // Get first 10 VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany({ take: 10 })
     *
     * // Only select the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.findMany({ select: { identifier: true } })
     *
     */
    findMany<T extends VerificationTokenFindManyArgs>(
      args?: SelectSubset<T, VerificationTokenFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$VerificationTokenPayload<ExtArgs>,
        T,
        'findMany',
        GlobalOmitOptions
      >
    >;

    /**
     * Create a VerificationToken.
     * @param {VerificationTokenCreateArgs} args - Arguments to create a VerificationToken.
     * @example
     * // Create one VerificationToken
     * const VerificationToken = await prisma.verificationToken.create({
     *   data: {
     *     // ... data to create a VerificationToken
     *   }
     * })
     *
     */
    create<T extends VerificationTokenCreateArgs>(
      args: SelectSubset<T, VerificationTokenCreateArgs<ExtArgs>>,
    ): Prisma__VerificationTokenClient<
      $Result.GetResult<
        Prisma.$VerificationTokenPayload<ExtArgs>,
        T,
        'create',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many VerificationTokens.
     * @param {VerificationTokenCreateManyArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends VerificationTokenCreateManyArgs>(
      args?: SelectSubset<T, VerificationTokenCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many VerificationTokens and returns the data saved in the database.
     * @param {VerificationTokenCreateManyAndReturnArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many VerificationTokens and only return the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.createManyAndReturn({
     *   select: { identifier: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends VerificationTokenCreateManyAndReturnArgs>(
      args?: SelectSubset<T, VerificationTokenCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$VerificationTokenPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a VerificationToken.
     * @param {VerificationTokenDeleteArgs} args - Arguments to delete one VerificationToken.
     * @example
     * // Delete one VerificationToken
     * const VerificationToken = await prisma.verificationToken.delete({
     *   where: {
     *     // ... filter to delete one VerificationToken
     *   }
     * })
     *
     */
    delete<T extends VerificationTokenDeleteArgs>(
      args: SelectSubset<T, VerificationTokenDeleteArgs<ExtArgs>>,
    ): Prisma__VerificationTokenClient<
      $Result.GetResult<
        Prisma.$VerificationTokenPayload<ExtArgs>,
        T,
        'delete',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one VerificationToken.
     * @param {VerificationTokenUpdateArgs} args - Arguments to update one VerificationToken.
     * @example
     * // Update one VerificationToken
     * const verificationToken = await prisma.verificationToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends VerificationTokenUpdateArgs>(
      args: SelectSubset<T, VerificationTokenUpdateArgs<ExtArgs>>,
    ): Prisma__VerificationTokenClient<
      $Result.GetResult<
        Prisma.$VerificationTokenPayload<ExtArgs>,
        T,
        'update',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more VerificationTokens.
     * @param {VerificationTokenDeleteManyArgs} args - Arguments to filter VerificationTokens to delete.
     * @example
     * // Delete a few VerificationTokens
     * const { count } = await prisma.verificationToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends VerificationTokenDeleteManyArgs>(
      args?: SelectSubset<T, VerificationTokenDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends VerificationTokenUpdateManyArgs>(
      args: SelectSubset<T, VerificationTokenUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more VerificationTokens and returns the data updated in the database.
     * @param {VerificationTokenUpdateManyAndReturnArgs} args - Arguments to update many VerificationTokens.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more VerificationTokens and only return the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.updateManyAndReturn({
     *   select: { identifier: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends VerificationTokenUpdateManyAndReturnArgs>(
      args: SelectSubset<T, VerificationTokenUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$VerificationTokenPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one VerificationToken.
     * @param {VerificationTokenUpsertArgs} args - Arguments to update or create a VerificationToken.
     * @example
     * // Update or create a VerificationToken
     * const verificationToken = await prisma.verificationToken.upsert({
     *   create: {
     *     // ... data to create a VerificationToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VerificationToken we want to update
     *   }
     * })
     */
    upsert<T extends VerificationTokenUpsertArgs>(
      args: SelectSubset<T, VerificationTokenUpsertArgs<ExtArgs>>,
    ): Prisma__VerificationTokenClient<
      $Result.GetResult<
        Prisma.$VerificationTokenPayload<ExtArgs>,
        T,
        'upsert',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenCountArgs} args - Arguments to filter VerificationTokens to count.
     * @example
     * // Count the number of VerificationTokens
     * const count = await prisma.verificationToken.count({
     *   where: {
     *     // ... the filter for the VerificationTokens we want to count
     *   }
     * })
     **/
    count<T extends VerificationTokenCountArgs>(
      args?: Subset<T, VerificationTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<
              T['select'],
              VerificationTokenCountAggregateOutputType
            >
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends VerificationTokenAggregateArgs>(
      args: Subset<T, VerificationTokenAggregateArgs>,
    ): Prisma.PrismaPromise<GetVerificationTokenAggregateType<T>>;

    /**
     * Group by VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends VerificationTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationTokenGroupByArgs['orderBy'] }
        : { orderBy?: VerificationTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      'Field ',
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, VerificationTokenGroupByArgs, OrderByArg> &
        InputErrors,
    ): {} extends InputErrors
      ? GetVerificationTokenGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the VerificationToken model
     */
    readonly fields: VerificationTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VerificationToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VerificationTokenClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the VerificationToken model
   */
  interface VerificationTokenFieldRefs {
    readonly identifier: FieldRef<'VerificationToken', 'String'>;
    readonly token: FieldRef<'VerificationToken', 'String'>;
    readonly expires: FieldRef<'VerificationToken', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * VerificationToken findUnique
   */
  export type VerificationTokenFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null;
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput;
  };

  /**
   * VerificationToken findUniqueOrThrow
   */
  export type VerificationTokenFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null;
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput;
  };

  /**
   * VerificationToken findFirst
   */
  export type VerificationTokenFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null;
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?:
      | VerificationTokenOrderByWithRelationInput
      | VerificationTokenOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` VerificationTokens.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?:
      | VerificationTokenScalarFieldEnum
      | VerificationTokenScalarFieldEnum[];
  };

  /**
   * VerificationToken findFirstOrThrow
   */
  export type VerificationTokenFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null;
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?:
      | VerificationTokenOrderByWithRelationInput
      | VerificationTokenOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` VerificationTokens.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?:
      | VerificationTokenScalarFieldEnum
      | VerificationTokenScalarFieldEnum[];
  };

  /**
   * VerificationToken findMany
   */
  export type VerificationTokenFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null;
    /**
     * Filter, which VerificationTokens to fetch.
     */
    where?: VerificationTokenWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?:
      | VerificationTokenOrderByWithRelationInput
      | VerificationTokenOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` VerificationTokens.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?:
      | VerificationTokenScalarFieldEnum
      | VerificationTokenScalarFieldEnum[];
  };

  /**
   * VerificationToken create
   */
  export type VerificationTokenCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null;
    /**
     * The data needed to create a VerificationToken.
     */
    data: XOR<
      VerificationTokenCreateInput,
      VerificationTokenUncheckedCreateInput
    >;
  };

  /**
   * VerificationToken createMany
   */
  export type VerificationTokenCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * VerificationToken createManyAndReturn
   */
  export type VerificationTokenCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null;
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * VerificationToken update
   */
  export type VerificationTokenUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null;
    /**
     * The data needed to update a VerificationToken.
     */
    data: XOR<
      VerificationTokenUpdateInput,
      VerificationTokenUncheckedUpdateInput
    >;
    /**
     * Choose, which VerificationToken to update.
     */
    where: VerificationTokenWhereUniqueInput;
  };

  /**
   * VerificationToken updateMany
   */
  export type VerificationTokenUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<
      VerificationTokenUpdateManyMutationInput,
      VerificationTokenUncheckedUpdateManyInput
    >;
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput;
    /**
     * Limit how many VerificationTokens to update.
     */
    limit?: number;
  };

  /**
   * VerificationToken updateManyAndReturn
   */
  export type VerificationTokenUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null;
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<
      VerificationTokenUpdateManyMutationInput,
      VerificationTokenUncheckedUpdateManyInput
    >;
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput;
    /**
     * Limit how many VerificationTokens to update.
     */
    limit?: number;
  };

  /**
   * VerificationToken upsert
   */
  export type VerificationTokenUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null;
    /**
     * The filter to search for the VerificationToken to update in case it exists.
     */
    where: VerificationTokenWhereUniqueInput;
    /**
     * In case the VerificationToken found by the `where` argument doesn't exist, create a new VerificationToken with this data.
     */
    create: XOR<
      VerificationTokenCreateInput,
      VerificationTokenUncheckedCreateInput
    >;
    /**
     * In case the VerificationToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<
      VerificationTokenUpdateInput,
      VerificationTokenUncheckedUpdateInput
    >;
  };

  /**
   * VerificationToken delete
   */
  export type VerificationTokenDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null;
    /**
     * Filter which VerificationToken to delete.
     */
    where: VerificationTokenWhereUniqueInput;
  };

  /**
   * VerificationToken deleteMany
   */
  export type VerificationTokenDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which VerificationTokens to delete
     */
    where?: VerificationTokenWhereInput;
    /**
     * Limit how many VerificationTokens to delete.
     */
    limit?: number;
  };

  /**
   * VerificationToken without action
   */
  export type VerificationTokenDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null;
  };

  /**
   * Model Fund
   */

  export type AggregateFund = {
    _count: FundCountAggregateOutputType | null;
    _avg: FundAvgAggregateOutputType | null;
    _sum: FundSumAggregateOutputType | null;
    _min: FundMinAggregateOutputType | null;
    _max: FundMaxAggregateOutputType | null;
  };

  export type FundAvgAggregateOutputType = {
    nav: Decimal | null;
    aum: Decimal | null;
    expenseRatio: Decimal | null;
    sharpeRatio: Decimal | null;
    alpha: Decimal | null;
    beta: Decimal | null;
    stdDeviation: Decimal | null;
    returns1y: Decimal | null;
    returns3y: Decimal | null;
    returns5y: Decimal | null;
    returns10y: Decimal | null;
  };

  export type FundSumAggregateOutputType = {
    nav: Decimal | null;
    aum: Decimal | null;
    expenseRatio: Decimal | null;
    sharpeRatio: Decimal | null;
    alpha: Decimal | null;
    beta: Decimal | null;
    stdDeviation: Decimal | null;
    returns1y: Decimal | null;
    returns3y: Decimal | null;
    returns5y: Decimal | null;
    returns10y: Decimal | null;
  };

  export type FundMinAggregateOutputType = {
    id: string | null;
    schemeCode: string | null;
    schemeName: string | null;
    amcName: string | null;
    category: string | null;
    subCategory: string | null;
    nav: Decimal | null;
    aum: Decimal | null;
    expenseRatio: Decimal | null;
    sharpeRatio: Decimal | null;
    alpha: Decimal | null;
    beta: Decimal | null;
    stdDeviation: Decimal | null;
    returns1y: Decimal | null;
    returns3y: Decimal | null;
    returns5y: Decimal | null;
    returns10y: Decimal | null;
    managerName: string | null;
    launchDate: Date | null;
    benchmarkIndex: string | null;
    isActive: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type FundMaxAggregateOutputType = {
    id: string | null;
    schemeCode: string | null;
    schemeName: string | null;
    amcName: string | null;
    category: string | null;
    subCategory: string | null;
    nav: Decimal | null;
    aum: Decimal | null;
    expenseRatio: Decimal | null;
    sharpeRatio: Decimal | null;
    alpha: Decimal | null;
    beta: Decimal | null;
    stdDeviation: Decimal | null;
    returns1y: Decimal | null;
    returns3y: Decimal | null;
    returns5y: Decimal | null;
    returns10y: Decimal | null;
    managerName: string | null;
    launchDate: Date | null;
    benchmarkIndex: string | null;
    isActive: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type FundCountAggregateOutputType = {
    id: number;
    schemeCode: number;
    schemeName: number;
    amcName: number;
    category: number;
    subCategory: number;
    nav: number;
    aum: number;
    expenseRatio: number;
    sharpeRatio: number;
    alpha: number;
    beta: number;
    stdDeviation: number;
    returns1y: number;
    returns3y: number;
    returns5y: number;
    returns10y: number;
    managerName: number;
    launchDate: number;
    benchmarkIndex: number;
    isActive: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type FundAvgAggregateInputType = {
    nav?: true;
    aum?: true;
    expenseRatio?: true;
    sharpeRatio?: true;
    alpha?: true;
    beta?: true;
    stdDeviation?: true;
    returns1y?: true;
    returns3y?: true;
    returns5y?: true;
    returns10y?: true;
  };

  export type FundSumAggregateInputType = {
    nav?: true;
    aum?: true;
    expenseRatio?: true;
    sharpeRatio?: true;
    alpha?: true;
    beta?: true;
    stdDeviation?: true;
    returns1y?: true;
    returns3y?: true;
    returns5y?: true;
    returns10y?: true;
  };

  export type FundMinAggregateInputType = {
    id?: true;
    schemeCode?: true;
    schemeName?: true;
    amcName?: true;
    category?: true;
    subCategory?: true;
    nav?: true;
    aum?: true;
    expenseRatio?: true;
    sharpeRatio?: true;
    alpha?: true;
    beta?: true;
    stdDeviation?: true;
    returns1y?: true;
    returns3y?: true;
    returns5y?: true;
    returns10y?: true;
    managerName?: true;
    launchDate?: true;
    benchmarkIndex?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type FundMaxAggregateInputType = {
    id?: true;
    schemeCode?: true;
    schemeName?: true;
    amcName?: true;
    category?: true;
    subCategory?: true;
    nav?: true;
    aum?: true;
    expenseRatio?: true;
    sharpeRatio?: true;
    alpha?: true;
    beta?: true;
    stdDeviation?: true;
    returns1y?: true;
    returns3y?: true;
    returns5y?: true;
    returns10y?: true;
    managerName?: true;
    launchDate?: true;
    benchmarkIndex?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type FundCountAggregateInputType = {
    id?: true;
    schemeCode?: true;
    schemeName?: true;
    amcName?: true;
    category?: true;
    subCategory?: true;
    nav?: true;
    aum?: true;
    expenseRatio?: true;
    sharpeRatio?: true;
    alpha?: true;
    beta?: true;
    stdDeviation?: true;
    returns1y?: true;
    returns3y?: true;
    returns5y?: true;
    returns10y?: true;
    managerName?: true;
    launchDate?: true;
    benchmarkIndex?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type FundAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Fund to aggregate.
     */
    where?: FundWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Funds to fetch.
     */
    orderBy?: FundOrderByWithRelationInput | FundOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: FundWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Funds from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Funds.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Funds
     **/
    _count?: true | FundCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: FundAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: FundSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: FundMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: FundMaxAggregateInputType;
  };

  export type GetFundAggregateType<T extends FundAggregateArgs> = {
    [P in keyof T & keyof AggregateFund]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFund[P]>
      : GetScalarType<T[P], AggregateFund[P]>;
  };

  export type FundGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: FundWhereInput;
    orderBy?:
      | FundOrderByWithAggregationInput
      | FundOrderByWithAggregationInput[];
    by: FundScalarFieldEnum[] | FundScalarFieldEnum;
    having?: FundScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: FundCountAggregateInputType | true;
    _avg?: FundAvgAggregateInputType;
    _sum?: FundSumAggregateInputType;
    _min?: FundMinAggregateInputType;
    _max?: FundMaxAggregateInputType;
  };

  export type FundGroupByOutputType = {
    id: string;
    schemeCode: string;
    schemeName: string;
    amcName: string;
    category: string;
    subCategory: string | null;
    nav: Decimal;
    aum: Decimal | null;
    expenseRatio: Decimal | null;
    sharpeRatio: Decimal | null;
    alpha: Decimal | null;
    beta: Decimal | null;
    stdDeviation: Decimal | null;
    returns1y: Decimal | null;
    returns3y: Decimal | null;
    returns5y: Decimal | null;
    returns10y: Decimal | null;
    managerName: string | null;
    launchDate: Date | null;
    benchmarkIndex: string | null;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: FundCountAggregateOutputType | null;
    _avg: FundAvgAggregateOutputType | null;
    _sum: FundSumAggregateOutputType | null;
    _min: FundMinAggregateOutputType | null;
    _max: FundMaxAggregateOutputType | null;
  };

  type GetFundGroupByPayload<T extends FundGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FundGroupByOutputType, T['by']> & {
        [P in keyof T & keyof FundGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], FundGroupByOutputType[P]>
          : GetScalarType<T[P], FundGroupByOutputType[P]>;
      }
    >
  >;

  export type FundSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      schemeCode?: boolean;
      schemeName?: boolean;
      amcName?: boolean;
      category?: boolean;
      subCategory?: boolean;
      nav?: boolean;
      aum?: boolean;
      expenseRatio?: boolean;
      sharpeRatio?: boolean;
      alpha?: boolean;
      beta?: boolean;
      stdDeviation?: boolean;
      returns1y?: boolean;
      returns3y?: boolean;
      returns5y?: boolean;
      returns10y?: boolean;
      managerName?: boolean;
      launchDate?: boolean;
      benchmarkIndex?: boolean;
      isActive?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      navHistory?: boolean | Fund$navHistoryArgs<ExtArgs>;
      holdings?: boolean | Fund$holdingsArgs<ExtArgs>;
      transactions?: boolean | Fund$transactionsArgs<ExtArgs>;
      watchlist?: boolean | Fund$watchlistArgs<ExtArgs>;
      _count?: boolean | FundCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['fund']
  >;

  export type FundSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      schemeCode?: boolean;
      schemeName?: boolean;
      amcName?: boolean;
      category?: boolean;
      subCategory?: boolean;
      nav?: boolean;
      aum?: boolean;
      expenseRatio?: boolean;
      sharpeRatio?: boolean;
      alpha?: boolean;
      beta?: boolean;
      stdDeviation?: boolean;
      returns1y?: boolean;
      returns3y?: boolean;
      returns5y?: boolean;
      returns10y?: boolean;
      managerName?: boolean;
      launchDate?: boolean;
      benchmarkIndex?: boolean;
      isActive?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['fund']
  >;

  export type FundSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      schemeCode?: boolean;
      schemeName?: boolean;
      amcName?: boolean;
      category?: boolean;
      subCategory?: boolean;
      nav?: boolean;
      aum?: boolean;
      expenseRatio?: boolean;
      sharpeRatio?: boolean;
      alpha?: boolean;
      beta?: boolean;
      stdDeviation?: boolean;
      returns1y?: boolean;
      returns3y?: boolean;
      returns5y?: boolean;
      returns10y?: boolean;
      managerName?: boolean;
      launchDate?: boolean;
      benchmarkIndex?: boolean;
      isActive?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['fund']
  >;

  export type FundSelectScalar = {
    id?: boolean;
    schemeCode?: boolean;
    schemeName?: boolean;
    amcName?: boolean;
    category?: boolean;
    subCategory?: boolean;
    nav?: boolean;
    aum?: boolean;
    expenseRatio?: boolean;
    sharpeRatio?: boolean;
    alpha?: boolean;
    beta?: boolean;
    stdDeviation?: boolean;
    returns1y?: boolean;
    returns3y?: boolean;
    returns5y?: boolean;
    returns10y?: boolean;
    managerName?: boolean;
    launchDate?: boolean;
    benchmarkIndex?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type FundOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    | 'id'
    | 'schemeCode'
    | 'schemeName'
    | 'amcName'
    | 'category'
    | 'subCategory'
    | 'nav'
    | 'aum'
    | 'expenseRatio'
    | 'sharpeRatio'
    | 'alpha'
    | 'beta'
    | 'stdDeviation'
    | 'returns1y'
    | 'returns3y'
    | 'returns5y'
    | 'returns10y'
    | 'managerName'
    | 'launchDate'
    | 'benchmarkIndex'
    | 'isActive'
    | 'createdAt'
    | 'updatedAt',
    ExtArgs['result']['fund']
  >;
  export type FundInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    navHistory?: boolean | Fund$navHistoryArgs<ExtArgs>;
    holdings?: boolean | Fund$holdingsArgs<ExtArgs>;
    transactions?: boolean | Fund$transactionsArgs<ExtArgs>;
    watchlist?: boolean | Fund$watchlistArgs<ExtArgs>;
    _count?: boolean | FundCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type FundIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};
  export type FundIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};

  export type $FundPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'Fund';
    objects: {
      navHistory: Prisma.$NavHistoryPayload<ExtArgs>[];
      holdings: Prisma.$HoldingPayload<ExtArgs>[];
      transactions: Prisma.$TransactionPayload<ExtArgs>[];
      watchlist: Prisma.$WatchlistPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        schemeCode: string;
        schemeName: string;
        amcName: string;
        category: string;
        subCategory: string | null;
        nav: Prisma.Decimal;
        aum: Prisma.Decimal | null;
        expenseRatio: Prisma.Decimal | null;
        sharpeRatio: Prisma.Decimal | null;
        alpha: Prisma.Decimal | null;
        beta: Prisma.Decimal | null;
        stdDeviation: Prisma.Decimal | null;
        returns1y: Prisma.Decimal | null;
        returns3y: Prisma.Decimal | null;
        returns5y: Prisma.Decimal | null;
        returns10y: Prisma.Decimal | null;
        managerName: string | null;
        launchDate: Date | null;
        benchmarkIndex: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs['result']['fund']
    >;
    composites: {};
  };

  type FundGetPayload<S extends boolean | null | undefined | FundDefaultArgs> =
    $Result.GetResult<Prisma.$FundPayload, S>;

  type FundCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<FundFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: FundCountAggregateInputType | true;
  };

  export interface FundDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['Fund'];
      meta: { name: 'Fund' };
    };
    /**
     * Find zero or one Fund that matches the filter.
     * @param {FundFindUniqueArgs} args - Arguments to find a Fund
     * @example
     * // Get one Fund
     * const fund = await prisma.fund.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FundFindUniqueArgs>(
      args: SelectSubset<T, FundFindUniqueArgs<ExtArgs>>,
    ): Prisma__FundClient<
      $Result.GetResult<
        Prisma.$FundPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Fund that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FundFindUniqueOrThrowArgs} args - Arguments to find a Fund
     * @example
     * // Get one Fund
     * const fund = await prisma.fund.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FundFindUniqueOrThrowArgs>(
      args: SelectSubset<T, FundFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__FundClient<
      $Result.GetResult<
        Prisma.$FundPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Fund that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FundFindFirstArgs} args - Arguments to find a Fund
     * @example
     * // Get one Fund
     * const fund = await prisma.fund.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FundFindFirstArgs>(
      args?: SelectSubset<T, FundFindFirstArgs<ExtArgs>>,
    ): Prisma__FundClient<
      $Result.GetResult<
        Prisma.$FundPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Fund that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FundFindFirstOrThrowArgs} args - Arguments to find a Fund
     * @example
     * // Get one Fund
     * const fund = await prisma.fund.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FundFindFirstOrThrowArgs>(
      args?: SelectSubset<T, FundFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__FundClient<
      $Result.GetResult<
        Prisma.$FundPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Funds that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FundFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Funds
     * const funds = await prisma.fund.findMany()
     *
     * // Get first 10 Funds
     * const funds = await prisma.fund.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const fundWithIdOnly = await prisma.fund.findMany({ select: { id: true } })
     *
     */
    findMany<T extends FundFindManyArgs>(
      args?: SelectSubset<T, FundFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$FundPayload<ExtArgs>,
        T,
        'findMany',
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Fund.
     * @param {FundCreateArgs} args - Arguments to create a Fund.
     * @example
     * // Create one Fund
     * const Fund = await prisma.fund.create({
     *   data: {
     *     // ... data to create a Fund
     *   }
     * })
     *
     */
    create<T extends FundCreateArgs>(
      args: SelectSubset<T, FundCreateArgs<ExtArgs>>,
    ): Prisma__FundClient<
      $Result.GetResult<
        Prisma.$FundPayload<ExtArgs>,
        T,
        'create',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Funds.
     * @param {FundCreateManyArgs} args - Arguments to create many Funds.
     * @example
     * // Create many Funds
     * const fund = await prisma.fund.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends FundCreateManyArgs>(
      args?: SelectSubset<T, FundCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Funds and returns the data saved in the database.
     * @param {FundCreateManyAndReturnArgs} args - Arguments to create many Funds.
     * @example
     * // Create many Funds
     * const fund = await prisma.fund.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Funds and only return the `id`
     * const fundWithIdOnly = await prisma.fund.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends FundCreateManyAndReturnArgs>(
      args?: SelectSubset<T, FundCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$FundPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Fund.
     * @param {FundDeleteArgs} args - Arguments to delete one Fund.
     * @example
     * // Delete one Fund
     * const Fund = await prisma.fund.delete({
     *   where: {
     *     // ... filter to delete one Fund
     *   }
     * })
     *
     */
    delete<T extends FundDeleteArgs>(
      args: SelectSubset<T, FundDeleteArgs<ExtArgs>>,
    ): Prisma__FundClient<
      $Result.GetResult<
        Prisma.$FundPayload<ExtArgs>,
        T,
        'delete',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Fund.
     * @param {FundUpdateArgs} args - Arguments to update one Fund.
     * @example
     * // Update one Fund
     * const fund = await prisma.fund.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends FundUpdateArgs>(
      args: SelectSubset<T, FundUpdateArgs<ExtArgs>>,
    ): Prisma__FundClient<
      $Result.GetResult<
        Prisma.$FundPayload<ExtArgs>,
        T,
        'update',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Funds.
     * @param {FundDeleteManyArgs} args - Arguments to filter Funds to delete.
     * @example
     * // Delete a few Funds
     * const { count } = await prisma.fund.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends FundDeleteManyArgs>(
      args?: SelectSubset<T, FundDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Funds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FundUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Funds
     * const fund = await prisma.fund.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends FundUpdateManyArgs>(
      args: SelectSubset<T, FundUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Funds and returns the data updated in the database.
     * @param {FundUpdateManyAndReturnArgs} args - Arguments to update many Funds.
     * @example
     * // Update many Funds
     * const fund = await prisma.fund.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Funds and only return the `id`
     * const fundWithIdOnly = await prisma.fund.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends FundUpdateManyAndReturnArgs>(
      args: SelectSubset<T, FundUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$FundPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Fund.
     * @param {FundUpsertArgs} args - Arguments to update or create a Fund.
     * @example
     * // Update or create a Fund
     * const fund = await prisma.fund.upsert({
     *   create: {
     *     // ... data to create a Fund
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Fund we want to update
     *   }
     * })
     */
    upsert<T extends FundUpsertArgs>(
      args: SelectSubset<T, FundUpsertArgs<ExtArgs>>,
    ): Prisma__FundClient<
      $Result.GetResult<
        Prisma.$FundPayload<ExtArgs>,
        T,
        'upsert',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Funds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FundCountArgs} args - Arguments to filter Funds to count.
     * @example
     * // Count the number of Funds
     * const count = await prisma.fund.count({
     *   where: {
     *     // ... the filter for the Funds we want to count
     *   }
     * })
     **/
    count<T extends FundCountArgs>(
      args?: Subset<T, FundCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FundCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Fund.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FundAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends FundAggregateArgs>(
      args: Subset<T, FundAggregateArgs>,
    ): Prisma.PrismaPromise<GetFundAggregateType<T>>;

    /**
     * Group by Fund.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FundGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends FundGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FundGroupByArgs['orderBy'] }
        : { orderBy?: FundGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      'Field ',
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, FundGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetFundGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Fund model
     */
    readonly fields: FundFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Fund.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FundClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    navHistory<T extends Fund$navHistoryArgs<ExtArgs> = {}>(
      args?: Subset<T, Fund$navHistoryArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$NavHistoryPayload<ExtArgs>,
          T,
          'findMany',
          GlobalOmitOptions
        >
      | Null
    >;
    holdings<T extends Fund$holdingsArgs<ExtArgs> = {}>(
      args?: Subset<T, Fund$holdingsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$HoldingPayload<ExtArgs>,
          T,
          'findMany',
          GlobalOmitOptions
        >
      | Null
    >;
    transactions<T extends Fund$transactionsArgs<ExtArgs> = {}>(
      args?: Subset<T, Fund$transactionsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$TransactionPayload<ExtArgs>,
          T,
          'findMany',
          GlobalOmitOptions
        >
      | Null
    >;
    watchlist<T extends Fund$watchlistArgs<ExtArgs> = {}>(
      args?: Subset<T, Fund$watchlistArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$WatchlistPayload<ExtArgs>,
          T,
          'findMany',
          GlobalOmitOptions
        >
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Fund model
   */
  interface FundFieldRefs {
    readonly id: FieldRef<'Fund', 'String'>;
    readonly schemeCode: FieldRef<'Fund', 'String'>;
    readonly schemeName: FieldRef<'Fund', 'String'>;
    readonly amcName: FieldRef<'Fund', 'String'>;
    readonly category: FieldRef<'Fund', 'String'>;
    readonly subCategory: FieldRef<'Fund', 'String'>;
    readonly nav: FieldRef<'Fund', 'Decimal'>;
    readonly aum: FieldRef<'Fund', 'Decimal'>;
    readonly expenseRatio: FieldRef<'Fund', 'Decimal'>;
    readonly sharpeRatio: FieldRef<'Fund', 'Decimal'>;
    readonly alpha: FieldRef<'Fund', 'Decimal'>;
    readonly beta: FieldRef<'Fund', 'Decimal'>;
    readonly stdDeviation: FieldRef<'Fund', 'Decimal'>;
    readonly returns1y: FieldRef<'Fund', 'Decimal'>;
    readonly returns3y: FieldRef<'Fund', 'Decimal'>;
    readonly returns5y: FieldRef<'Fund', 'Decimal'>;
    readonly returns10y: FieldRef<'Fund', 'Decimal'>;
    readonly managerName: FieldRef<'Fund', 'String'>;
    readonly launchDate: FieldRef<'Fund', 'DateTime'>;
    readonly benchmarkIndex: FieldRef<'Fund', 'String'>;
    readonly isActive: FieldRef<'Fund', 'Boolean'>;
    readonly createdAt: FieldRef<'Fund', 'DateTime'>;
    readonly updatedAt: FieldRef<'Fund', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * Fund findUnique
   */
  export type FundFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Fund
     */
    select?: FundSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Fund
     */
    omit?: FundOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundInclude<ExtArgs> | null;
    /**
     * Filter, which Fund to fetch.
     */
    where: FundWhereUniqueInput;
  };

  /**
   * Fund findUniqueOrThrow
   */
  export type FundFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Fund
     */
    select?: FundSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Fund
     */
    omit?: FundOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundInclude<ExtArgs> | null;
    /**
     * Filter, which Fund to fetch.
     */
    where: FundWhereUniqueInput;
  };

  /**
   * Fund findFirst
   */
  export type FundFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Fund
     */
    select?: FundSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Fund
     */
    omit?: FundOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundInclude<ExtArgs> | null;
    /**
     * Filter, which Fund to fetch.
     */
    where?: FundWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Funds to fetch.
     */
    orderBy?: FundOrderByWithRelationInput | FundOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Funds.
     */
    cursor?: FundWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Funds from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Funds.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Funds.
     */
    distinct?: FundScalarFieldEnum | FundScalarFieldEnum[];
  };

  /**
   * Fund findFirstOrThrow
   */
  export type FundFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Fund
     */
    select?: FundSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Fund
     */
    omit?: FundOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundInclude<ExtArgs> | null;
    /**
     * Filter, which Fund to fetch.
     */
    where?: FundWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Funds to fetch.
     */
    orderBy?: FundOrderByWithRelationInput | FundOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Funds.
     */
    cursor?: FundWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Funds from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Funds.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Funds.
     */
    distinct?: FundScalarFieldEnum | FundScalarFieldEnum[];
  };

  /**
   * Fund findMany
   */
  export type FundFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Fund
     */
    select?: FundSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Fund
     */
    omit?: FundOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundInclude<ExtArgs> | null;
    /**
     * Filter, which Funds to fetch.
     */
    where?: FundWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Funds to fetch.
     */
    orderBy?: FundOrderByWithRelationInput | FundOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Funds.
     */
    cursor?: FundWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Funds from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Funds.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Funds.
     */
    distinct?: FundScalarFieldEnum | FundScalarFieldEnum[];
  };

  /**
   * Fund create
   */
  export type FundCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Fund
     */
    select?: FundSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Fund
     */
    omit?: FundOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundInclude<ExtArgs> | null;
    /**
     * The data needed to create a Fund.
     */
    data: XOR<FundCreateInput, FundUncheckedCreateInput>;
  };

  /**
   * Fund createMany
   */
  export type FundCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Funds.
     */
    data: FundCreateManyInput | FundCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Fund createManyAndReturn
   */
  export type FundCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Fund
     */
    select?: FundSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Fund
     */
    omit?: FundOmit<ExtArgs> | null;
    /**
     * The data used to create many Funds.
     */
    data: FundCreateManyInput | FundCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Fund update
   */
  export type FundUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Fund
     */
    select?: FundSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Fund
     */
    omit?: FundOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundInclude<ExtArgs> | null;
    /**
     * The data needed to update a Fund.
     */
    data: XOR<FundUpdateInput, FundUncheckedUpdateInput>;
    /**
     * Choose, which Fund to update.
     */
    where: FundWhereUniqueInput;
  };

  /**
   * Fund updateMany
   */
  export type FundUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Funds.
     */
    data: XOR<FundUpdateManyMutationInput, FundUncheckedUpdateManyInput>;
    /**
     * Filter which Funds to update
     */
    where?: FundWhereInput;
    /**
     * Limit how many Funds to update.
     */
    limit?: number;
  };

  /**
   * Fund updateManyAndReturn
   */
  export type FundUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Fund
     */
    select?: FundSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Fund
     */
    omit?: FundOmit<ExtArgs> | null;
    /**
     * The data used to update Funds.
     */
    data: XOR<FundUpdateManyMutationInput, FundUncheckedUpdateManyInput>;
    /**
     * Filter which Funds to update
     */
    where?: FundWhereInput;
    /**
     * Limit how many Funds to update.
     */
    limit?: number;
  };

  /**
   * Fund upsert
   */
  export type FundUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Fund
     */
    select?: FundSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Fund
     */
    omit?: FundOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundInclude<ExtArgs> | null;
    /**
     * The filter to search for the Fund to update in case it exists.
     */
    where: FundWhereUniqueInput;
    /**
     * In case the Fund found by the `where` argument doesn't exist, create a new Fund with this data.
     */
    create: XOR<FundCreateInput, FundUncheckedCreateInput>;
    /**
     * In case the Fund was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FundUpdateInput, FundUncheckedUpdateInput>;
  };

  /**
   * Fund delete
   */
  export type FundDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Fund
     */
    select?: FundSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Fund
     */
    omit?: FundOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundInclude<ExtArgs> | null;
    /**
     * Filter which Fund to delete.
     */
    where: FundWhereUniqueInput;
  };

  /**
   * Fund deleteMany
   */
  export type FundDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Funds to delete
     */
    where?: FundWhereInput;
    /**
     * Limit how many Funds to delete.
     */
    limit?: number;
  };

  /**
   * Fund.navHistory
   */
  export type Fund$navHistoryArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the NavHistory
     */
    select?: NavHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the NavHistory
     */
    omit?: NavHistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NavHistoryInclude<ExtArgs> | null;
    where?: NavHistoryWhereInput;
    orderBy?:
      | NavHistoryOrderByWithRelationInput
      | NavHistoryOrderByWithRelationInput[];
    cursor?: NavHistoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: NavHistoryScalarFieldEnum | NavHistoryScalarFieldEnum[];
  };

  /**
   * Fund.holdings
   */
  export type Fund$holdingsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Holding
     */
    select?: HoldingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Holding
     */
    omit?: HoldingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingInclude<ExtArgs> | null;
    where?: HoldingWhereInput;
    orderBy?:
      | HoldingOrderByWithRelationInput
      | HoldingOrderByWithRelationInput[];
    cursor?: HoldingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: HoldingScalarFieldEnum | HoldingScalarFieldEnum[];
  };

  /**
   * Fund.transactions
   */
  export type Fund$transactionsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null;
    where?: TransactionWhereInput;
    orderBy?:
      | TransactionOrderByWithRelationInput
      | TransactionOrderByWithRelationInput[];
    cursor?: TransactionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[];
  };

  /**
   * Fund.watchlist
   */
  export type Fund$watchlistArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Watchlist
     */
    select?: WatchlistSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Watchlist
     */
    omit?: WatchlistOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistInclude<ExtArgs> | null;
    where?: WatchlistWhereInput;
    orderBy?:
      | WatchlistOrderByWithRelationInput
      | WatchlistOrderByWithRelationInput[];
    cursor?: WatchlistWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: WatchlistScalarFieldEnum | WatchlistScalarFieldEnum[];
  };

  /**
   * Fund without action
   */
  export type FundDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Fund
     */
    select?: FundSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Fund
     */
    omit?: FundOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundInclude<ExtArgs> | null;
  };

  /**
   * Model NavHistory
   */

  export type AggregateNavHistory = {
    _count: NavHistoryCountAggregateOutputType | null;
    _avg: NavHistoryAvgAggregateOutputType | null;
    _sum: NavHistorySumAggregateOutputType | null;
    _min: NavHistoryMinAggregateOutputType | null;
    _max: NavHistoryMaxAggregateOutputType | null;
  };

  export type NavHistoryAvgAggregateOutputType = {
    nav: Decimal | null;
  };

  export type NavHistorySumAggregateOutputType = {
    nav: Decimal | null;
  };

  export type NavHistoryMinAggregateOutputType = {
    id: string | null;
    fundId: string | null;
    nav: Decimal | null;
    date: Date | null;
    createdAt: Date | null;
  };

  export type NavHistoryMaxAggregateOutputType = {
    id: string | null;
    fundId: string | null;
    nav: Decimal | null;
    date: Date | null;
    createdAt: Date | null;
  };

  export type NavHistoryCountAggregateOutputType = {
    id: number;
    fundId: number;
    nav: number;
    date: number;
    createdAt: number;
    _all: number;
  };

  export type NavHistoryAvgAggregateInputType = {
    nav?: true;
  };

  export type NavHistorySumAggregateInputType = {
    nav?: true;
  };

  export type NavHistoryMinAggregateInputType = {
    id?: true;
    fundId?: true;
    nav?: true;
    date?: true;
    createdAt?: true;
  };

  export type NavHistoryMaxAggregateInputType = {
    id?: true;
    fundId?: true;
    nav?: true;
    date?: true;
    createdAt?: true;
  };

  export type NavHistoryCountAggregateInputType = {
    id?: true;
    fundId?: true;
    nav?: true;
    date?: true;
    createdAt?: true;
    _all?: true;
  };

  export type NavHistoryAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which NavHistory to aggregate.
     */
    where?: NavHistoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of NavHistories to fetch.
     */
    orderBy?:
      | NavHistoryOrderByWithRelationInput
      | NavHistoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: NavHistoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` NavHistories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` NavHistories.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned NavHistories
     **/
    _count?: true | NavHistoryCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: NavHistoryAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: NavHistorySumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: NavHistoryMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: NavHistoryMaxAggregateInputType;
  };

  export type GetNavHistoryAggregateType<T extends NavHistoryAggregateArgs> = {
    [P in keyof T & keyof AggregateNavHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNavHistory[P]>
      : GetScalarType<T[P], AggregateNavHistory[P]>;
  };

  export type NavHistoryGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: NavHistoryWhereInput;
    orderBy?:
      | NavHistoryOrderByWithAggregationInput
      | NavHistoryOrderByWithAggregationInput[];
    by: NavHistoryScalarFieldEnum[] | NavHistoryScalarFieldEnum;
    having?: NavHistoryScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: NavHistoryCountAggregateInputType | true;
    _avg?: NavHistoryAvgAggregateInputType;
    _sum?: NavHistorySumAggregateInputType;
    _min?: NavHistoryMinAggregateInputType;
    _max?: NavHistoryMaxAggregateInputType;
  };

  export type NavHistoryGroupByOutputType = {
    id: string;
    fundId: string;
    nav: Decimal;
    date: Date;
    createdAt: Date;
    _count: NavHistoryCountAggregateOutputType | null;
    _avg: NavHistoryAvgAggregateOutputType | null;
    _sum: NavHistorySumAggregateOutputType | null;
    _min: NavHistoryMinAggregateOutputType | null;
    _max: NavHistoryMaxAggregateOutputType | null;
  };

  type GetNavHistoryGroupByPayload<T extends NavHistoryGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<NavHistoryGroupByOutputType, T['by']> & {
          [P in keyof T & keyof NavHistoryGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NavHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], NavHistoryGroupByOutputType[P]>;
        }
      >
    >;

  export type NavHistorySelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      fundId?: boolean;
      nav?: boolean;
      date?: boolean;
      createdAt?: boolean;
      fund?: boolean | FundDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['navHistory']
  >;

  export type NavHistorySelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      fundId?: boolean;
      nav?: boolean;
      date?: boolean;
      createdAt?: boolean;
      fund?: boolean | FundDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['navHistory']
  >;

  export type NavHistorySelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      fundId?: boolean;
      nav?: boolean;
      date?: boolean;
      createdAt?: boolean;
      fund?: boolean | FundDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['navHistory']
  >;

  export type NavHistorySelectScalar = {
    id?: boolean;
    fundId?: boolean;
    nav?: boolean;
    date?: boolean;
    createdAt?: boolean;
  };

  export type NavHistoryOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    'id' | 'fundId' | 'nav' | 'date' | 'createdAt',
    ExtArgs['result']['navHistory']
  >;
  export type NavHistoryInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    fund?: boolean | FundDefaultArgs<ExtArgs>;
  };
  export type NavHistoryIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    fund?: boolean | FundDefaultArgs<ExtArgs>;
  };
  export type NavHistoryIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    fund?: boolean | FundDefaultArgs<ExtArgs>;
  };

  export type $NavHistoryPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'NavHistory';
    objects: {
      fund: Prisma.$FundPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        fundId: string;
        nav: Prisma.Decimal;
        date: Date;
        createdAt: Date;
      },
      ExtArgs['result']['navHistory']
    >;
    composites: {};
  };

  type NavHistoryGetPayload<
    S extends boolean | null | undefined | NavHistoryDefaultArgs,
  > = $Result.GetResult<Prisma.$NavHistoryPayload, S>;

  type NavHistoryCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<
    NavHistoryFindManyArgs,
    'select' | 'include' | 'distinct' | 'omit'
  > & {
    select?: NavHistoryCountAggregateInputType | true;
  };

  export interface NavHistoryDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['NavHistory'];
      meta: { name: 'NavHistory' };
    };
    /**
     * Find zero or one NavHistory that matches the filter.
     * @param {NavHistoryFindUniqueArgs} args - Arguments to find a NavHistory
     * @example
     * // Get one NavHistory
     * const navHistory = await prisma.navHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NavHistoryFindUniqueArgs>(
      args: SelectSubset<T, NavHistoryFindUniqueArgs<ExtArgs>>,
    ): Prisma__NavHistoryClient<
      $Result.GetResult<
        Prisma.$NavHistoryPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one NavHistory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NavHistoryFindUniqueOrThrowArgs} args - Arguments to find a NavHistory
     * @example
     * // Get one NavHistory
     * const navHistory = await prisma.navHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NavHistoryFindUniqueOrThrowArgs>(
      args: SelectSubset<T, NavHistoryFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__NavHistoryClient<
      $Result.GetResult<
        Prisma.$NavHistoryPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first NavHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NavHistoryFindFirstArgs} args - Arguments to find a NavHistory
     * @example
     * // Get one NavHistory
     * const navHistory = await prisma.navHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NavHistoryFindFirstArgs>(
      args?: SelectSubset<T, NavHistoryFindFirstArgs<ExtArgs>>,
    ): Prisma__NavHistoryClient<
      $Result.GetResult<
        Prisma.$NavHistoryPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first NavHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NavHistoryFindFirstOrThrowArgs} args - Arguments to find a NavHistory
     * @example
     * // Get one NavHistory
     * const navHistory = await prisma.navHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NavHistoryFindFirstOrThrowArgs>(
      args?: SelectSubset<T, NavHistoryFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__NavHistoryClient<
      $Result.GetResult<
        Prisma.$NavHistoryPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more NavHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NavHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NavHistories
     * const navHistories = await prisma.navHistory.findMany()
     *
     * // Get first 10 NavHistories
     * const navHistories = await prisma.navHistory.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const navHistoryWithIdOnly = await prisma.navHistory.findMany({ select: { id: true } })
     *
     */
    findMany<T extends NavHistoryFindManyArgs>(
      args?: SelectSubset<T, NavHistoryFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$NavHistoryPayload<ExtArgs>,
        T,
        'findMany',
        GlobalOmitOptions
      >
    >;

    /**
     * Create a NavHistory.
     * @param {NavHistoryCreateArgs} args - Arguments to create a NavHistory.
     * @example
     * // Create one NavHistory
     * const NavHistory = await prisma.navHistory.create({
     *   data: {
     *     // ... data to create a NavHistory
     *   }
     * })
     *
     */
    create<T extends NavHistoryCreateArgs>(
      args: SelectSubset<T, NavHistoryCreateArgs<ExtArgs>>,
    ): Prisma__NavHistoryClient<
      $Result.GetResult<
        Prisma.$NavHistoryPayload<ExtArgs>,
        T,
        'create',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many NavHistories.
     * @param {NavHistoryCreateManyArgs} args - Arguments to create many NavHistories.
     * @example
     * // Create many NavHistories
     * const navHistory = await prisma.navHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends NavHistoryCreateManyArgs>(
      args?: SelectSubset<T, NavHistoryCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many NavHistories and returns the data saved in the database.
     * @param {NavHistoryCreateManyAndReturnArgs} args - Arguments to create many NavHistories.
     * @example
     * // Create many NavHistories
     * const navHistory = await prisma.navHistory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many NavHistories and only return the `id`
     * const navHistoryWithIdOnly = await prisma.navHistory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends NavHistoryCreateManyAndReturnArgs>(
      args?: SelectSubset<T, NavHistoryCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$NavHistoryPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a NavHistory.
     * @param {NavHistoryDeleteArgs} args - Arguments to delete one NavHistory.
     * @example
     * // Delete one NavHistory
     * const NavHistory = await prisma.navHistory.delete({
     *   where: {
     *     // ... filter to delete one NavHistory
     *   }
     * })
     *
     */
    delete<T extends NavHistoryDeleteArgs>(
      args: SelectSubset<T, NavHistoryDeleteArgs<ExtArgs>>,
    ): Prisma__NavHistoryClient<
      $Result.GetResult<
        Prisma.$NavHistoryPayload<ExtArgs>,
        T,
        'delete',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one NavHistory.
     * @param {NavHistoryUpdateArgs} args - Arguments to update one NavHistory.
     * @example
     * // Update one NavHistory
     * const navHistory = await prisma.navHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends NavHistoryUpdateArgs>(
      args: SelectSubset<T, NavHistoryUpdateArgs<ExtArgs>>,
    ): Prisma__NavHistoryClient<
      $Result.GetResult<
        Prisma.$NavHistoryPayload<ExtArgs>,
        T,
        'update',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more NavHistories.
     * @param {NavHistoryDeleteManyArgs} args - Arguments to filter NavHistories to delete.
     * @example
     * // Delete a few NavHistories
     * const { count } = await prisma.navHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends NavHistoryDeleteManyArgs>(
      args?: SelectSubset<T, NavHistoryDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more NavHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NavHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NavHistories
     * const navHistory = await prisma.navHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends NavHistoryUpdateManyArgs>(
      args: SelectSubset<T, NavHistoryUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more NavHistories and returns the data updated in the database.
     * @param {NavHistoryUpdateManyAndReturnArgs} args - Arguments to update many NavHistories.
     * @example
     * // Update many NavHistories
     * const navHistory = await prisma.navHistory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more NavHistories and only return the `id`
     * const navHistoryWithIdOnly = await prisma.navHistory.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends NavHistoryUpdateManyAndReturnArgs>(
      args: SelectSubset<T, NavHistoryUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$NavHistoryPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one NavHistory.
     * @param {NavHistoryUpsertArgs} args - Arguments to update or create a NavHistory.
     * @example
     * // Update or create a NavHistory
     * const navHistory = await prisma.navHistory.upsert({
     *   create: {
     *     // ... data to create a NavHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NavHistory we want to update
     *   }
     * })
     */
    upsert<T extends NavHistoryUpsertArgs>(
      args: SelectSubset<T, NavHistoryUpsertArgs<ExtArgs>>,
    ): Prisma__NavHistoryClient<
      $Result.GetResult<
        Prisma.$NavHistoryPayload<ExtArgs>,
        T,
        'upsert',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of NavHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NavHistoryCountArgs} args - Arguments to filter NavHistories to count.
     * @example
     * // Count the number of NavHistories
     * const count = await prisma.navHistory.count({
     *   where: {
     *     // ... the filter for the NavHistories we want to count
     *   }
     * })
     **/
    count<T extends NavHistoryCountArgs>(
      args?: Subset<T, NavHistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NavHistoryCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a NavHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NavHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends NavHistoryAggregateArgs>(
      args: Subset<T, NavHistoryAggregateArgs>,
    ): Prisma.PrismaPromise<GetNavHistoryAggregateType<T>>;

    /**
     * Group by NavHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NavHistoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends NavHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NavHistoryGroupByArgs['orderBy'] }
        : { orderBy?: NavHistoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      'Field ',
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, NavHistoryGroupByArgs, OrderByArg> &
        InputErrors,
    ): {} extends InputErrors
      ? GetNavHistoryGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the NavHistory model
     */
    readonly fields: NavHistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for NavHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NavHistoryClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    fund<T extends FundDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, FundDefaultArgs<ExtArgs>>,
    ): Prisma__FundClient<
      | $Result.GetResult<
          Prisma.$FundPayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the NavHistory model
   */
  interface NavHistoryFieldRefs {
    readonly id: FieldRef<'NavHistory', 'String'>;
    readonly fundId: FieldRef<'NavHistory', 'String'>;
    readonly nav: FieldRef<'NavHistory', 'Decimal'>;
    readonly date: FieldRef<'NavHistory', 'DateTime'>;
    readonly createdAt: FieldRef<'NavHistory', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * NavHistory findUnique
   */
  export type NavHistoryFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the NavHistory
     */
    select?: NavHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the NavHistory
     */
    omit?: NavHistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NavHistoryInclude<ExtArgs> | null;
    /**
     * Filter, which NavHistory to fetch.
     */
    where: NavHistoryWhereUniqueInput;
  };

  /**
   * NavHistory findUniqueOrThrow
   */
  export type NavHistoryFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the NavHistory
     */
    select?: NavHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the NavHistory
     */
    omit?: NavHistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NavHistoryInclude<ExtArgs> | null;
    /**
     * Filter, which NavHistory to fetch.
     */
    where: NavHistoryWhereUniqueInput;
  };

  /**
   * NavHistory findFirst
   */
  export type NavHistoryFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the NavHistory
     */
    select?: NavHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the NavHistory
     */
    omit?: NavHistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NavHistoryInclude<ExtArgs> | null;
    /**
     * Filter, which NavHistory to fetch.
     */
    where?: NavHistoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of NavHistories to fetch.
     */
    orderBy?:
      | NavHistoryOrderByWithRelationInput
      | NavHistoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for NavHistories.
     */
    cursor?: NavHistoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` NavHistories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` NavHistories.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of NavHistories.
     */
    distinct?: NavHistoryScalarFieldEnum | NavHistoryScalarFieldEnum[];
  };

  /**
   * NavHistory findFirstOrThrow
   */
  export type NavHistoryFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the NavHistory
     */
    select?: NavHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the NavHistory
     */
    omit?: NavHistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NavHistoryInclude<ExtArgs> | null;
    /**
     * Filter, which NavHistory to fetch.
     */
    where?: NavHistoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of NavHistories to fetch.
     */
    orderBy?:
      | NavHistoryOrderByWithRelationInput
      | NavHistoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for NavHistories.
     */
    cursor?: NavHistoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` NavHistories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` NavHistories.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of NavHistories.
     */
    distinct?: NavHistoryScalarFieldEnum | NavHistoryScalarFieldEnum[];
  };

  /**
   * NavHistory findMany
   */
  export type NavHistoryFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the NavHistory
     */
    select?: NavHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the NavHistory
     */
    omit?: NavHistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NavHistoryInclude<ExtArgs> | null;
    /**
     * Filter, which NavHistories to fetch.
     */
    where?: NavHistoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of NavHistories to fetch.
     */
    orderBy?:
      | NavHistoryOrderByWithRelationInput
      | NavHistoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing NavHistories.
     */
    cursor?: NavHistoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` NavHistories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` NavHistories.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of NavHistories.
     */
    distinct?: NavHistoryScalarFieldEnum | NavHistoryScalarFieldEnum[];
  };

  /**
   * NavHistory create
   */
  export type NavHistoryCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the NavHistory
     */
    select?: NavHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the NavHistory
     */
    omit?: NavHistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NavHistoryInclude<ExtArgs> | null;
    /**
     * The data needed to create a NavHistory.
     */
    data: XOR<NavHistoryCreateInput, NavHistoryUncheckedCreateInput>;
  };

  /**
   * NavHistory createMany
   */
  export type NavHistoryCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many NavHistories.
     */
    data: NavHistoryCreateManyInput | NavHistoryCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * NavHistory createManyAndReturn
   */
  export type NavHistoryCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the NavHistory
     */
    select?: NavHistorySelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the NavHistory
     */
    omit?: NavHistoryOmit<ExtArgs> | null;
    /**
     * The data used to create many NavHistories.
     */
    data: NavHistoryCreateManyInput | NavHistoryCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NavHistoryIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * NavHistory update
   */
  export type NavHistoryUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the NavHistory
     */
    select?: NavHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the NavHistory
     */
    omit?: NavHistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NavHistoryInclude<ExtArgs> | null;
    /**
     * The data needed to update a NavHistory.
     */
    data: XOR<NavHistoryUpdateInput, NavHistoryUncheckedUpdateInput>;
    /**
     * Choose, which NavHistory to update.
     */
    where: NavHistoryWhereUniqueInput;
  };

  /**
   * NavHistory updateMany
   */
  export type NavHistoryUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update NavHistories.
     */
    data: XOR<
      NavHistoryUpdateManyMutationInput,
      NavHistoryUncheckedUpdateManyInput
    >;
    /**
     * Filter which NavHistories to update
     */
    where?: NavHistoryWhereInput;
    /**
     * Limit how many NavHistories to update.
     */
    limit?: number;
  };

  /**
   * NavHistory updateManyAndReturn
   */
  export type NavHistoryUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the NavHistory
     */
    select?: NavHistorySelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the NavHistory
     */
    omit?: NavHistoryOmit<ExtArgs> | null;
    /**
     * The data used to update NavHistories.
     */
    data: XOR<
      NavHistoryUpdateManyMutationInput,
      NavHistoryUncheckedUpdateManyInput
    >;
    /**
     * Filter which NavHistories to update
     */
    where?: NavHistoryWhereInput;
    /**
     * Limit how many NavHistories to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NavHistoryIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * NavHistory upsert
   */
  export type NavHistoryUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the NavHistory
     */
    select?: NavHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the NavHistory
     */
    omit?: NavHistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NavHistoryInclude<ExtArgs> | null;
    /**
     * The filter to search for the NavHistory to update in case it exists.
     */
    where: NavHistoryWhereUniqueInput;
    /**
     * In case the NavHistory found by the `where` argument doesn't exist, create a new NavHistory with this data.
     */
    create: XOR<NavHistoryCreateInput, NavHistoryUncheckedCreateInput>;
    /**
     * In case the NavHistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NavHistoryUpdateInput, NavHistoryUncheckedUpdateInput>;
  };

  /**
   * NavHistory delete
   */
  export type NavHistoryDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the NavHistory
     */
    select?: NavHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the NavHistory
     */
    omit?: NavHistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NavHistoryInclude<ExtArgs> | null;
    /**
     * Filter which NavHistory to delete.
     */
    where: NavHistoryWhereUniqueInput;
  };

  /**
   * NavHistory deleteMany
   */
  export type NavHistoryDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which NavHistories to delete
     */
    where?: NavHistoryWhereInput;
    /**
     * Limit how many NavHistories to delete.
     */
    limit?: number;
  };

  /**
   * NavHistory without action
   */
  export type NavHistoryDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the NavHistory
     */
    select?: NavHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the NavHistory
     */
    omit?: NavHistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NavHistoryInclude<ExtArgs> | null;
  };

  /**
   * Model Portfolio
   */

  export type AggregatePortfolio = {
    _count: PortfolioCountAggregateOutputType | null;
    _min: PortfolioMinAggregateOutputType | null;
    _max: PortfolioMaxAggregateOutputType | null;
  };

  export type PortfolioMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    name: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type PortfolioMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    name: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type PortfolioCountAggregateOutputType = {
    id: number;
    userId: number;
    name: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type PortfolioMinAggregateInputType = {
    id?: true;
    userId?: true;
    name?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type PortfolioMaxAggregateInputType = {
    id?: true;
    userId?: true;
    name?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type PortfolioCountAggregateInputType = {
    id?: true;
    userId?: true;
    name?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type PortfolioAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Portfolio to aggregate.
     */
    where?: PortfolioWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Portfolios to fetch.
     */
    orderBy?:
      | PortfolioOrderByWithRelationInput
      | PortfolioOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: PortfolioWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Portfolios from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Portfolios.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Portfolios
     **/
    _count?: true | PortfolioCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: PortfolioMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: PortfolioMaxAggregateInputType;
  };

  export type GetPortfolioAggregateType<T extends PortfolioAggregateArgs> = {
    [P in keyof T & keyof AggregatePortfolio]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePortfolio[P]>
      : GetScalarType<T[P], AggregatePortfolio[P]>;
  };

  export type PortfolioGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: PortfolioWhereInput;
    orderBy?:
      | PortfolioOrderByWithAggregationInput
      | PortfolioOrderByWithAggregationInput[];
    by: PortfolioScalarFieldEnum[] | PortfolioScalarFieldEnum;
    having?: PortfolioScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PortfolioCountAggregateInputType | true;
    _min?: PortfolioMinAggregateInputType;
    _max?: PortfolioMaxAggregateInputType;
  };

  export type PortfolioGroupByOutputType = {
    id: string;
    userId: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    _count: PortfolioCountAggregateOutputType | null;
    _min: PortfolioMinAggregateOutputType | null;
    _max: PortfolioMaxAggregateOutputType | null;
  };

  type GetPortfolioGroupByPayload<T extends PortfolioGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<PortfolioGroupByOutputType, T['by']> & {
          [P in keyof T & keyof PortfolioGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PortfolioGroupByOutputType[P]>
            : GetScalarType<T[P], PortfolioGroupByOutputType[P]>;
        }
      >
    >;

  export type PortfolioSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      name?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
      holdings?: boolean | Portfolio$holdingsArgs<ExtArgs>;
      _count?: boolean | PortfolioCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['portfolio']
  >;

  export type PortfolioSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      name?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['portfolio']
  >;

  export type PortfolioSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      name?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['portfolio']
  >;

  export type PortfolioSelectScalar = {
    id?: boolean;
    userId?: boolean;
    name?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type PortfolioOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    'id' | 'userId' | 'name' | 'createdAt' | 'updatedAt',
    ExtArgs['result']['portfolio']
  >;
  export type PortfolioInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
    holdings?: boolean | Portfolio$holdingsArgs<ExtArgs>;
    _count?: boolean | PortfolioCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type PortfolioIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type PortfolioIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };

  export type $PortfolioPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'Portfolio';
    objects: {
      user: Prisma.$UserPayload<ExtArgs>;
      holdings: Prisma.$HoldingPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        userId: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs['result']['portfolio']
    >;
    composites: {};
  };

  type PortfolioGetPayload<
    S extends boolean | null | undefined | PortfolioDefaultArgs,
  > = $Result.GetResult<Prisma.$PortfolioPayload, S>;

  type PortfolioCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<
    PortfolioFindManyArgs,
    'select' | 'include' | 'distinct' | 'omit'
  > & {
    select?: PortfolioCountAggregateInputType | true;
  };

  export interface PortfolioDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['Portfolio'];
      meta: { name: 'Portfolio' };
    };
    /**
     * Find zero or one Portfolio that matches the filter.
     * @param {PortfolioFindUniqueArgs} args - Arguments to find a Portfolio
     * @example
     * // Get one Portfolio
     * const portfolio = await prisma.portfolio.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PortfolioFindUniqueArgs>(
      args: SelectSubset<T, PortfolioFindUniqueArgs<ExtArgs>>,
    ): Prisma__PortfolioClient<
      $Result.GetResult<
        Prisma.$PortfolioPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Portfolio that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PortfolioFindUniqueOrThrowArgs} args - Arguments to find a Portfolio
     * @example
     * // Get one Portfolio
     * const portfolio = await prisma.portfolio.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PortfolioFindUniqueOrThrowArgs>(
      args: SelectSubset<T, PortfolioFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__PortfolioClient<
      $Result.GetResult<
        Prisma.$PortfolioPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Portfolio that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioFindFirstArgs} args - Arguments to find a Portfolio
     * @example
     * // Get one Portfolio
     * const portfolio = await prisma.portfolio.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PortfolioFindFirstArgs>(
      args?: SelectSubset<T, PortfolioFindFirstArgs<ExtArgs>>,
    ): Prisma__PortfolioClient<
      $Result.GetResult<
        Prisma.$PortfolioPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Portfolio that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioFindFirstOrThrowArgs} args - Arguments to find a Portfolio
     * @example
     * // Get one Portfolio
     * const portfolio = await prisma.portfolio.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PortfolioFindFirstOrThrowArgs>(
      args?: SelectSubset<T, PortfolioFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__PortfolioClient<
      $Result.GetResult<
        Prisma.$PortfolioPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Portfolios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Portfolios
     * const portfolios = await prisma.portfolio.findMany()
     *
     * // Get first 10 Portfolios
     * const portfolios = await prisma.portfolio.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const portfolioWithIdOnly = await prisma.portfolio.findMany({ select: { id: true } })
     *
     */
    findMany<T extends PortfolioFindManyArgs>(
      args?: SelectSubset<T, PortfolioFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$PortfolioPayload<ExtArgs>,
        T,
        'findMany',
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Portfolio.
     * @param {PortfolioCreateArgs} args - Arguments to create a Portfolio.
     * @example
     * // Create one Portfolio
     * const Portfolio = await prisma.portfolio.create({
     *   data: {
     *     // ... data to create a Portfolio
     *   }
     * })
     *
     */
    create<T extends PortfolioCreateArgs>(
      args: SelectSubset<T, PortfolioCreateArgs<ExtArgs>>,
    ): Prisma__PortfolioClient<
      $Result.GetResult<
        Prisma.$PortfolioPayload<ExtArgs>,
        T,
        'create',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Portfolios.
     * @param {PortfolioCreateManyArgs} args - Arguments to create many Portfolios.
     * @example
     * // Create many Portfolios
     * const portfolio = await prisma.portfolio.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends PortfolioCreateManyArgs>(
      args?: SelectSubset<T, PortfolioCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Portfolios and returns the data saved in the database.
     * @param {PortfolioCreateManyAndReturnArgs} args - Arguments to create many Portfolios.
     * @example
     * // Create many Portfolios
     * const portfolio = await prisma.portfolio.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Portfolios and only return the `id`
     * const portfolioWithIdOnly = await prisma.portfolio.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends PortfolioCreateManyAndReturnArgs>(
      args?: SelectSubset<T, PortfolioCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$PortfolioPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Portfolio.
     * @param {PortfolioDeleteArgs} args - Arguments to delete one Portfolio.
     * @example
     * // Delete one Portfolio
     * const Portfolio = await prisma.portfolio.delete({
     *   where: {
     *     // ... filter to delete one Portfolio
     *   }
     * })
     *
     */
    delete<T extends PortfolioDeleteArgs>(
      args: SelectSubset<T, PortfolioDeleteArgs<ExtArgs>>,
    ): Prisma__PortfolioClient<
      $Result.GetResult<
        Prisma.$PortfolioPayload<ExtArgs>,
        T,
        'delete',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Portfolio.
     * @param {PortfolioUpdateArgs} args - Arguments to update one Portfolio.
     * @example
     * // Update one Portfolio
     * const portfolio = await prisma.portfolio.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends PortfolioUpdateArgs>(
      args: SelectSubset<T, PortfolioUpdateArgs<ExtArgs>>,
    ): Prisma__PortfolioClient<
      $Result.GetResult<
        Prisma.$PortfolioPayload<ExtArgs>,
        T,
        'update',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Portfolios.
     * @param {PortfolioDeleteManyArgs} args - Arguments to filter Portfolios to delete.
     * @example
     * // Delete a few Portfolios
     * const { count } = await prisma.portfolio.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends PortfolioDeleteManyArgs>(
      args?: SelectSubset<T, PortfolioDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Portfolios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Portfolios
     * const portfolio = await prisma.portfolio.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends PortfolioUpdateManyArgs>(
      args: SelectSubset<T, PortfolioUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Portfolios and returns the data updated in the database.
     * @param {PortfolioUpdateManyAndReturnArgs} args - Arguments to update many Portfolios.
     * @example
     * // Update many Portfolios
     * const portfolio = await prisma.portfolio.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Portfolios and only return the `id`
     * const portfolioWithIdOnly = await prisma.portfolio.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends PortfolioUpdateManyAndReturnArgs>(
      args: SelectSubset<T, PortfolioUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$PortfolioPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Portfolio.
     * @param {PortfolioUpsertArgs} args - Arguments to update or create a Portfolio.
     * @example
     * // Update or create a Portfolio
     * const portfolio = await prisma.portfolio.upsert({
     *   create: {
     *     // ... data to create a Portfolio
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Portfolio we want to update
     *   }
     * })
     */
    upsert<T extends PortfolioUpsertArgs>(
      args: SelectSubset<T, PortfolioUpsertArgs<ExtArgs>>,
    ): Prisma__PortfolioClient<
      $Result.GetResult<
        Prisma.$PortfolioPayload<ExtArgs>,
        T,
        'upsert',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Portfolios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioCountArgs} args - Arguments to filter Portfolios to count.
     * @example
     * // Count the number of Portfolios
     * const count = await prisma.portfolio.count({
     *   where: {
     *     // ... the filter for the Portfolios we want to count
     *   }
     * })
     **/
    count<T extends PortfolioCountArgs>(
      args?: Subset<T, PortfolioCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PortfolioCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Portfolio.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends PortfolioAggregateArgs>(
      args: Subset<T, PortfolioAggregateArgs>,
    ): Prisma.PrismaPromise<GetPortfolioAggregateType<T>>;

    /**
     * Group by Portfolio.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends PortfolioGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PortfolioGroupByArgs['orderBy'] }
        : { orderBy?: PortfolioGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      'Field ',
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, PortfolioGroupByArgs, OrderByArg> &
        InputErrors,
    ): {} extends InputErrors
      ? GetPortfolioGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Portfolio model
     */
    readonly fields: PortfolioFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Portfolio.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PortfolioClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    user<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>,
    ): Prisma__UserClient<
      | $Result.GetResult<
          Prisma.$UserPayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    holdings<T extends Portfolio$holdingsArgs<ExtArgs> = {}>(
      args?: Subset<T, Portfolio$holdingsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$HoldingPayload<ExtArgs>,
          T,
          'findMany',
          GlobalOmitOptions
        >
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Portfolio model
   */
  interface PortfolioFieldRefs {
    readonly id: FieldRef<'Portfolio', 'String'>;
    readonly userId: FieldRef<'Portfolio', 'String'>;
    readonly name: FieldRef<'Portfolio', 'String'>;
    readonly createdAt: FieldRef<'Portfolio', 'DateTime'>;
    readonly updatedAt: FieldRef<'Portfolio', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * Portfolio findUnique
   */
  export type PortfolioFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null;
    /**
     * Filter, which Portfolio to fetch.
     */
    where: PortfolioWhereUniqueInput;
  };

  /**
   * Portfolio findUniqueOrThrow
   */
  export type PortfolioFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null;
    /**
     * Filter, which Portfolio to fetch.
     */
    where: PortfolioWhereUniqueInput;
  };

  /**
   * Portfolio findFirst
   */
  export type PortfolioFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null;
    /**
     * Filter, which Portfolio to fetch.
     */
    where?: PortfolioWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Portfolios to fetch.
     */
    orderBy?:
      | PortfolioOrderByWithRelationInput
      | PortfolioOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Portfolios.
     */
    cursor?: PortfolioWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Portfolios from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Portfolios.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Portfolios.
     */
    distinct?: PortfolioScalarFieldEnum | PortfolioScalarFieldEnum[];
  };

  /**
   * Portfolio findFirstOrThrow
   */
  export type PortfolioFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null;
    /**
     * Filter, which Portfolio to fetch.
     */
    where?: PortfolioWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Portfolios to fetch.
     */
    orderBy?:
      | PortfolioOrderByWithRelationInput
      | PortfolioOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Portfolios.
     */
    cursor?: PortfolioWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Portfolios from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Portfolios.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Portfolios.
     */
    distinct?: PortfolioScalarFieldEnum | PortfolioScalarFieldEnum[];
  };

  /**
   * Portfolio findMany
   */
  export type PortfolioFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null;
    /**
     * Filter, which Portfolios to fetch.
     */
    where?: PortfolioWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Portfolios to fetch.
     */
    orderBy?:
      | PortfolioOrderByWithRelationInput
      | PortfolioOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Portfolios.
     */
    cursor?: PortfolioWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Portfolios from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Portfolios.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Portfolios.
     */
    distinct?: PortfolioScalarFieldEnum | PortfolioScalarFieldEnum[];
  };

  /**
   * Portfolio create
   */
  export type PortfolioCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null;
    /**
     * The data needed to create a Portfolio.
     */
    data: XOR<PortfolioCreateInput, PortfolioUncheckedCreateInput>;
  };

  /**
   * Portfolio createMany
   */
  export type PortfolioCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Portfolios.
     */
    data: PortfolioCreateManyInput | PortfolioCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Portfolio createManyAndReturn
   */
  export type PortfolioCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null;
    /**
     * The data used to create many Portfolios.
     */
    data: PortfolioCreateManyInput | PortfolioCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Portfolio update
   */
  export type PortfolioUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null;
    /**
     * The data needed to update a Portfolio.
     */
    data: XOR<PortfolioUpdateInput, PortfolioUncheckedUpdateInput>;
    /**
     * Choose, which Portfolio to update.
     */
    where: PortfolioWhereUniqueInput;
  };

  /**
   * Portfolio updateMany
   */
  export type PortfolioUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Portfolios.
     */
    data: XOR<
      PortfolioUpdateManyMutationInput,
      PortfolioUncheckedUpdateManyInput
    >;
    /**
     * Filter which Portfolios to update
     */
    where?: PortfolioWhereInput;
    /**
     * Limit how many Portfolios to update.
     */
    limit?: number;
  };

  /**
   * Portfolio updateManyAndReturn
   */
  export type PortfolioUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null;
    /**
     * The data used to update Portfolios.
     */
    data: XOR<
      PortfolioUpdateManyMutationInput,
      PortfolioUncheckedUpdateManyInput
    >;
    /**
     * Filter which Portfolios to update
     */
    where?: PortfolioWhereInput;
    /**
     * Limit how many Portfolios to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Portfolio upsert
   */
  export type PortfolioUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null;
    /**
     * The filter to search for the Portfolio to update in case it exists.
     */
    where: PortfolioWhereUniqueInput;
    /**
     * In case the Portfolio found by the `where` argument doesn't exist, create a new Portfolio with this data.
     */
    create: XOR<PortfolioCreateInput, PortfolioUncheckedCreateInput>;
    /**
     * In case the Portfolio was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PortfolioUpdateInput, PortfolioUncheckedUpdateInput>;
  };

  /**
   * Portfolio delete
   */
  export type PortfolioDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null;
    /**
     * Filter which Portfolio to delete.
     */
    where: PortfolioWhereUniqueInput;
  };

  /**
   * Portfolio deleteMany
   */
  export type PortfolioDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Portfolios to delete
     */
    where?: PortfolioWhereInput;
    /**
     * Limit how many Portfolios to delete.
     */
    limit?: number;
  };

  /**
   * Portfolio.holdings
   */
  export type Portfolio$holdingsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Holding
     */
    select?: HoldingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Holding
     */
    omit?: HoldingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingInclude<ExtArgs> | null;
    where?: HoldingWhereInput;
    orderBy?:
      | HoldingOrderByWithRelationInput
      | HoldingOrderByWithRelationInput[];
    cursor?: HoldingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: HoldingScalarFieldEnum | HoldingScalarFieldEnum[];
  };

  /**
   * Portfolio without action
   */
  export type PortfolioDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Portfolio
     */
    select?: PortfolioSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Portfolio
     */
    omit?: PortfolioOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioInclude<ExtArgs> | null;
  };

  /**
   * Model Holding
   */

  export type AggregateHolding = {
    _count: HoldingCountAggregateOutputType | null;
    _avg: HoldingAvgAggregateOutputType | null;
    _sum: HoldingSumAggregateOutputType | null;
    _min: HoldingMinAggregateOutputType | null;
    _max: HoldingMaxAggregateOutputType | null;
  };

  export type HoldingAvgAggregateOutputType = {
    units: Decimal | null;
    avgNav: Decimal | null;
    investedAmount: Decimal | null;
  };

  export type HoldingSumAggregateOutputType = {
    units: Decimal | null;
    avgNav: Decimal | null;
    investedAmount: Decimal | null;
  };

  export type HoldingMinAggregateOutputType = {
    id: string | null;
    portfolioId: string | null;
    fundId: string | null;
    units: Decimal | null;
    avgNav: Decimal | null;
    investedAmount: Decimal | null;
    purchaseDate: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type HoldingMaxAggregateOutputType = {
    id: string | null;
    portfolioId: string | null;
    fundId: string | null;
    units: Decimal | null;
    avgNav: Decimal | null;
    investedAmount: Decimal | null;
    purchaseDate: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type HoldingCountAggregateOutputType = {
    id: number;
    portfolioId: number;
    fundId: number;
    units: number;
    avgNav: number;
    investedAmount: number;
    purchaseDate: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type HoldingAvgAggregateInputType = {
    units?: true;
    avgNav?: true;
    investedAmount?: true;
  };

  export type HoldingSumAggregateInputType = {
    units?: true;
    avgNav?: true;
    investedAmount?: true;
  };

  export type HoldingMinAggregateInputType = {
    id?: true;
    portfolioId?: true;
    fundId?: true;
    units?: true;
    avgNav?: true;
    investedAmount?: true;
    purchaseDate?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type HoldingMaxAggregateInputType = {
    id?: true;
    portfolioId?: true;
    fundId?: true;
    units?: true;
    avgNav?: true;
    investedAmount?: true;
    purchaseDate?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type HoldingCountAggregateInputType = {
    id?: true;
    portfolioId?: true;
    fundId?: true;
    units?: true;
    avgNav?: true;
    investedAmount?: true;
    purchaseDate?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type HoldingAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Holding to aggregate.
     */
    where?: HoldingWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Holdings to fetch.
     */
    orderBy?:
      | HoldingOrderByWithRelationInput
      | HoldingOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: HoldingWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Holdings from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Holdings.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Holdings
     **/
    _count?: true | HoldingCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: HoldingAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: HoldingSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: HoldingMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: HoldingMaxAggregateInputType;
  };

  export type GetHoldingAggregateType<T extends HoldingAggregateArgs> = {
    [P in keyof T & keyof AggregateHolding]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHolding[P]>
      : GetScalarType<T[P], AggregateHolding[P]>;
  };

  export type HoldingGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: HoldingWhereInput;
    orderBy?:
      | HoldingOrderByWithAggregationInput
      | HoldingOrderByWithAggregationInput[];
    by: HoldingScalarFieldEnum[] | HoldingScalarFieldEnum;
    having?: HoldingScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: HoldingCountAggregateInputType | true;
    _avg?: HoldingAvgAggregateInputType;
    _sum?: HoldingSumAggregateInputType;
    _min?: HoldingMinAggregateInputType;
    _max?: HoldingMaxAggregateInputType;
  };

  export type HoldingGroupByOutputType = {
    id: string;
    portfolioId: string;
    fundId: string;
    units: Decimal;
    avgNav: Decimal;
    investedAmount: Decimal;
    purchaseDate: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: HoldingCountAggregateOutputType | null;
    _avg: HoldingAvgAggregateOutputType | null;
    _sum: HoldingSumAggregateOutputType | null;
    _min: HoldingMinAggregateOutputType | null;
    _max: HoldingMaxAggregateOutputType | null;
  };

  type GetHoldingGroupByPayload<T extends HoldingGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<HoldingGroupByOutputType, T['by']> & {
          [P in keyof T & keyof HoldingGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HoldingGroupByOutputType[P]>
            : GetScalarType<T[P], HoldingGroupByOutputType[P]>;
        }
      >
    >;

  export type HoldingSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      portfolioId?: boolean;
      fundId?: boolean;
      units?: boolean;
      avgNav?: boolean;
      investedAmount?: boolean;
      purchaseDate?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      portfolio?: boolean | PortfolioDefaultArgs<ExtArgs>;
      fund?: boolean | FundDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['holding']
  >;

  export type HoldingSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      portfolioId?: boolean;
      fundId?: boolean;
      units?: boolean;
      avgNav?: boolean;
      investedAmount?: boolean;
      purchaseDate?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      portfolio?: boolean | PortfolioDefaultArgs<ExtArgs>;
      fund?: boolean | FundDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['holding']
  >;

  export type HoldingSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      portfolioId?: boolean;
      fundId?: boolean;
      units?: boolean;
      avgNav?: boolean;
      investedAmount?: boolean;
      purchaseDate?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      portfolio?: boolean | PortfolioDefaultArgs<ExtArgs>;
      fund?: boolean | FundDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['holding']
  >;

  export type HoldingSelectScalar = {
    id?: boolean;
    portfolioId?: boolean;
    fundId?: boolean;
    units?: boolean;
    avgNav?: boolean;
    investedAmount?: boolean;
    purchaseDate?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type HoldingOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    | 'id'
    | 'portfolioId'
    | 'fundId'
    | 'units'
    | 'avgNav'
    | 'investedAmount'
    | 'purchaseDate'
    | 'createdAt'
    | 'updatedAt',
    ExtArgs['result']['holding']
  >;
  export type HoldingInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    portfolio?: boolean | PortfolioDefaultArgs<ExtArgs>;
    fund?: boolean | FundDefaultArgs<ExtArgs>;
  };
  export type HoldingIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    portfolio?: boolean | PortfolioDefaultArgs<ExtArgs>;
    fund?: boolean | FundDefaultArgs<ExtArgs>;
  };
  export type HoldingIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    portfolio?: boolean | PortfolioDefaultArgs<ExtArgs>;
    fund?: boolean | FundDefaultArgs<ExtArgs>;
  };

  export type $HoldingPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'Holding';
    objects: {
      portfolio: Prisma.$PortfolioPayload<ExtArgs>;
      fund: Prisma.$FundPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        portfolioId: string;
        fundId: string;
        units: Prisma.Decimal;
        avgNav: Prisma.Decimal;
        investedAmount: Prisma.Decimal;
        purchaseDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs['result']['holding']
    >;
    composites: {};
  };

  type HoldingGetPayload<
    S extends boolean | null | undefined | HoldingDefaultArgs,
  > = $Result.GetResult<Prisma.$HoldingPayload, S>;

  type HoldingCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<HoldingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: HoldingCountAggregateInputType | true;
  };

  export interface HoldingDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['Holding'];
      meta: { name: 'Holding' };
    };
    /**
     * Find zero or one Holding that matches the filter.
     * @param {HoldingFindUniqueArgs} args - Arguments to find a Holding
     * @example
     * // Get one Holding
     * const holding = await prisma.holding.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HoldingFindUniqueArgs>(
      args: SelectSubset<T, HoldingFindUniqueArgs<ExtArgs>>,
    ): Prisma__HoldingClient<
      $Result.GetResult<
        Prisma.$HoldingPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Holding that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HoldingFindUniqueOrThrowArgs} args - Arguments to find a Holding
     * @example
     * // Get one Holding
     * const holding = await prisma.holding.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HoldingFindUniqueOrThrowArgs>(
      args: SelectSubset<T, HoldingFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__HoldingClient<
      $Result.GetResult<
        Prisma.$HoldingPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Holding that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoldingFindFirstArgs} args - Arguments to find a Holding
     * @example
     * // Get one Holding
     * const holding = await prisma.holding.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HoldingFindFirstArgs>(
      args?: SelectSubset<T, HoldingFindFirstArgs<ExtArgs>>,
    ): Prisma__HoldingClient<
      $Result.GetResult<
        Prisma.$HoldingPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Holding that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoldingFindFirstOrThrowArgs} args - Arguments to find a Holding
     * @example
     * // Get one Holding
     * const holding = await prisma.holding.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HoldingFindFirstOrThrowArgs>(
      args?: SelectSubset<T, HoldingFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__HoldingClient<
      $Result.GetResult<
        Prisma.$HoldingPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Holdings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoldingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Holdings
     * const holdings = await prisma.holding.findMany()
     *
     * // Get first 10 Holdings
     * const holdings = await prisma.holding.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const holdingWithIdOnly = await prisma.holding.findMany({ select: { id: true } })
     *
     */
    findMany<T extends HoldingFindManyArgs>(
      args?: SelectSubset<T, HoldingFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$HoldingPayload<ExtArgs>,
        T,
        'findMany',
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Holding.
     * @param {HoldingCreateArgs} args - Arguments to create a Holding.
     * @example
     * // Create one Holding
     * const Holding = await prisma.holding.create({
     *   data: {
     *     // ... data to create a Holding
     *   }
     * })
     *
     */
    create<T extends HoldingCreateArgs>(
      args: SelectSubset<T, HoldingCreateArgs<ExtArgs>>,
    ): Prisma__HoldingClient<
      $Result.GetResult<
        Prisma.$HoldingPayload<ExtArgs>,
        T,
        'create',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Holdings.
     * @param {HoldingCreateManyArgs} args - Arguments to create many Holdings.
     * @example
     * // Create many Holdings
     * const holding = await prisma.holding.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends HoldingCreateManyArgs>(
      args?: SelectSubset<T, HoldingCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Holdings and returns the data saved in the database.
     * @param {HoldingCreateManyAndReturnArgs} args - Arguments to create many Holdings.
     * @example
     * // Create many Holdings
     * const holding = await prisma.holding.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Holdings and only return the `id`
     * const holdingWithIdOnly = await prisma.holding.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends HoldingCreateManyAndReturnArgs>(
      args?: SelectSubset<T, HoldingCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$HoldingPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Holding.
     * @param {HoldingDeleteArgs} args - Arguments to delete one Holding.
     * @example
     * // Delete one Holding
     * const Holding = await prisma.holding.delete({
     *   where: {
     *     // ... filter to delete one Holding
     *   }
     * })
     *
     */
    delete<T extends HoldingDeleteArgs>(
      args: SelectSubset<T, HoldingDeleteArgs<ExtArgs>>,
    ): Prisma__HoldingClient<
      $Result.GetResult<
        Prisma.$HoldingPayload<ExtArgs>,
        T,
        'delete',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Holding.
     * @param {HoldingUpdateArgs} args - Arguments to update one Holding.
     * @example
     * // Update one Holding
     * const holding = await prisma.holding.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends HoldingUpdateArgs>(
      args: SelectSubset<T, HoldingUpdateArgs<ExtArgs>>,
    ): Prisma__HoldingClient<
      $Result.GetResult<
        Prisma.$HoldingPayload<ExtArgs>,
        T,
        'update',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Holdings.
     * @param {HoldingDeleteManyArgs} args - Arguments to filter Holdings to delete.
     * @example
     * // Delete a few Holdings
     * const { count } = await prisma.holding.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends HoldingDeleteManyArgs>(
      args?: SelectSubset<T, HoldingDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Holdings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoldingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Holdings
     * const holding = await prisma.holding.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends HoldingUpdateManyArgs>(
      args: SelectSubset<T, HoldingUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Holdings and returns the data updated in the database.
     * @param {HoldingUpdateManyAndReturnArgs} args - Arguments to update many Holdings.
     * @example
     * // Update many Holdings
     * const holding = await prisma.holding.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Holdings and only return the `id`
     * const holdingWithIdOnly = await prisma.holding.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends HoldingUpdateManyAndReturnArgs>(
      args: SelectSubset<T, HoldingUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$HoldingPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Holding.
     * @param {HoldingUpsertArgs} args - Arguments to update or create a Holding.
     * @example
     * // Update or create a Holding
     * const holding = await prisma.holding.upsert({
     *   create: {
     *     // ... data to create a Holding
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Holding we want to update
     *   }
     * })
     */
    upsert<T extends HoldingUpsertArgs>(
      args: SelectSubset<T, HoldingUpsertArgs<ExtArgs>>,
    ): Prisma__HoldingClient<
      $Result.GetResult<
        Prisma.$HoldingPayload<ExtArgs>,
        T,
        'upsert',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Holdings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoldingCountArgs} args - Arguments to filter Holdings to count.
     * @example
     * // Count the number of Holdings
     * const count = await prisma.holding.count({
     *   where: {
     *     // ... the filter for the Holdings we want to count
     *   }
     * })
     **/
    count<T extends HoldingCountArgs>(
      args?: Subset<T, HoldingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HoldingCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Holding.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoldingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends HoldingAggregateArgs>(
      args: Subset<T, HoldingAggregateArgs>,
    ): Prisma.PrismaPromise<GetHoldingAggregateType<T>>;

    /**
     * Group by Holding.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoldingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends HoldingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HoldingGroupByArgs['orderBy'] }
        : { orderBy?: HoldingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      'Field ',
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, HoldingGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetHoldingGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Holding model
     */
    readonly fields: HoldingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Holding.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HoldingClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    portfolio<T extends PortfolioDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, PortfolioDefaultArgs<ExtArgs>>,
    ): Prisma__PortfolioClient<
      | $Result.GetResult<
          Prisma.$PortfolioPayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    fund<T extends FundDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, FundDefaultArgs<ExtArgs>>,
    ): Prisma__FundClient<
      | $Result.GetResult<
          Prisma.$FundPayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Holding model
   */
  interface HoldingFieldRefs {
    readonly id: FieldRef<'Holding', 'String'>;
    readonly portfolioId: FieldRef<'Holding', 'String'>;
    readonly fundId: FieldRef<'Holding', 'String'>;
    readonly units: FieldRef<'Holding', 'Decimal'>;
    readonly avgNav: FieldRef<'Holding', 'Decimal'>;
    readonly investedAmount: FieldRef<'Holding', 'Decimal'>;
    readonly purchaseDate: FieldRef<'Holding', 'DateTime'>;
    readonly createdAt: FieldRef<'Holding', 'DateTime'>;
    readonly updatedAt: FieldRef<'Holding', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * Holding findUnique
   */
  export type HoldingFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Holding
     */
    select?: HoldingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Holding
     */
    omit?: HoldingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingInclude<ExtArgs> | null;
    /**
     * Filter, which Holding to fetch.
     */
    where: HoldingWhereUniqueInput;
  };

  /**
   * Holding findUniqueOrThrow
   */
  export type HoldingFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Holding
     */
    select?: HoldingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Holding
     */
    omit?: HoldingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingInclude<ExtArgs> | null;
    /**
     * Filter, which Holding to fetch.
     */
    where: HoldingWhereUniqueInput;
  };

  /**
   * Holding findFirst
   */
  export type HoldingFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Holding
     */
    select?: HoldingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Holding
     */
    omit?: HoldingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingInclude<ExtArgs> | null;
    /**
     * Filter, which Holding to fetch.
     */
    where?: HoldingWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Holdings to fetch.
     */
    orderBy?:
      | HoldingOrderByWithRelationInput
      | HoldingOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Holdings.
     */
    cursor?: HoldingWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Holdings from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Holdings.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Holdings.
     */
    distinct?: HoldingScalarFieldEnum | HoldingScalarFieldEnum[];
  };

  /**
   * Holding findFirstOrThrow
   */
  export type HoldingFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Holding
     */
    select?: HoldingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Holding
     */
    omit?: HoldingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingInclude<ExtArgs> | null;
    /**
     * Filter, which Holding to fetch.
     */
    where?: HoldingWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Holdings to fetch.
     */
    orderBy?:
      | HoldingOrderByWithRelationInput
      | HoldingOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Holdings.
     */
    cursor?: HoldingWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Holdings from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Holdings.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Holdings.
     */
    distinct?: HoldingScalarFieldEnum | HoldingScalarFieldEnum[];
  };

  /**
   * Holding findMany
   */
  export type HoldingFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Holding
     */
    select?: HoldingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Holding
     */
    omit?: HoldingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingInclude<ExtArgs> | null;
    /**
     * Filter, which Holdings to fetch.
     */
    where?: HoldingWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Holdings to fetch.
     */
    orderBy?:
      | HoldingOrderByWithRelationInput
      | HoldingOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Holdings.
     */
    cursor?: HoldingWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Holdings from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Holdings.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Holdings.
     */
    distinct?: HoldingScalarFieldEnum | HoldingScalarFieldEnum[];
  };

  /**
   * Holding create
   */
  export type HoldingCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Holding
     */
    select?: HoldingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Holding
     */
    omit?: HoldingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingInclude<ExtArgs> | null;
    /**
     * The data needed to create a Holding.
     */
    data: XOR<HoldingCreateInput, HoldingUncheckedCreateInput>;
  };

  /**
   * Holding createMany
   */
  export type HoldingCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Holdings.
     */
    data: HoldingCreateManyInput | HoldingCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Holding createManyAndReturn
   */
  export type HoldingCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Holding
     */
    select?: HoldingSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Holding
     */
    omit?: HoldingOmit<ExtArgs> | null;
    /**
     * The data used to create many Holdings.
     */
    data: HoldingCreateManyInput | HoldingCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Holding update
   */
  export type HoldingUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Holding
     */
    select?: HoldingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Holding
     */
    omit?: HoldingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingInclude<ExtArgs> | null;
    /**
     * The data needed to update a Holding.
     */
    data: XOR<HoldingUpdateInput, HoldingUncheckedUpdateInput>;
    /**
     * Choose, which Holding to update.
     */
    where: HoldingWhereUniqueInput;
  };

  /**
   * Holding updateMany
   */
  export type HoldingUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Holdings.
     */
    data: XOR<HoldingUpdateManyMutationInput, HoldingUncheckedUpdateManyInput>;
    /**
     * Filter which Holdings to update
     */
    where?: HoldingWhereInput;
    /**
     * Limit how many Holdings to update.
     */
    limit?: number;
  };

  /**
   * Holding updateManyAndReturn
   */
  export type HoldingUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Holding
     */
    select?: HoldingSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Holding
     */
    omit?: HoldingOmit<ExtArgs> | null;
    /**
     * The data used to update Holdings.
     */
    data: XOR<HoldingUpdateManyMutationInput, HoldingUncheckedUpdateManyInput>;
    /**
     * Filter which Holdings to update
     */
    where?: HoldingWhereInput;
    /**
     * Limit how many Holdings to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Holding upsert
   */
  export type HoldingUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Holding
     */
    select?: HoldingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Holding
     */
    omit?: HoldingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingInclude<ExtArgs> | null;
    /**
     * The filter to search for the Holding to update in case it exists.
     */
    where: HoldingWhereUniqueInput;
    /**
     * In case the Holding found by the `where` argument doesn't exist, create a new Holding with this data.
     */
    create: XOR<HoldingCreateInput, HoldingUncheckedCreateInput>;
    /**
     * In case the Holding was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HoldingUpdateInput, HoldingUncheckedUpdateInput>;
  };

  /**
   * Holding delete
   */
  export type HoldingDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Holding
     */
    select?: HoldingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Holding
     */
    omit?: HoldingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingInclude<ExtArgs> | null;
    /**
     * Filter which Holding to delete.
     */
    where: HoldingWhereUniqueInput;
  };

  /**
   * Holding deleteMany
   */
  export type HoldingDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Holdings to delete
     */
    where?: HoldingWhereInput;
    /**
     * Limit how many Holdings to delete.
     */
    limit?: number;
  };

  /**
   * Holding without action
   */
  export type HoldingDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Holding
     */
    select?: HoldingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Holding
     */
    omit?: HoldingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingInclude<ExtArgs> | null;
  };

  /**
   * Model Transaction
   */

  export type AggregateTransaction = {
    _count: TransactionCountAggregateOutputType | null;
    _avg: TransactionAvgAggregateOutputType | null;
    _sum: TransactionSumAggregateOutputType | null;
    _min: TransactionMinAggregateOutputType | null;
    _max: TransactionMaxAggregateOutputType | null;
  };

  export type TransactionAvgAggregateOutputType = {
    amount: Decimal | null;
    units: Decimal | null;
    nav: Decimal | null;
  };

  export type TransactionSumAggregateOutputType = {
    amount: Decimal | null;
    units: Decimal | null;
    nav: Decimal | null;
  };

  export type TransactionMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    fundId: string | null;
    type: $Enums.TransactionType | null;
    amount: Decimal | null;
    units: Decimal | null;
    nav: Decimal | null;
    date: Date | null;
    status: $Enums.TransactionStatus | null;
    createdAt: Date | null;
  };

  export type TransactionMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    fundId: string | null;
    type: $Enums.TransactionType | null;
    amount: Decimal | null;
    units: Decimal | null;
    nav: Decimal | null;
    date: Date | null;
    status: $Enums.TransactionStatus | null;
    createdAt: Date | null;
  };

  export type TransactionCountAggregateOutputType = {
    id: number;
    userId: number;
    fundId: number;
    type: number;
    amount: number;
    units: number;
    nav: number;
    date: number;
    status: number;
    createdAt: number;
    _all: number;
  };

  export type TransactionAvgAggregateInputType = {
    amount?: true;
    units?: true;
    nav?: true;
  };

  export type TransactionSumAggregateInputType = {
    amount?: true;
    units?: true;
    nav?: true;
  };

  export type TransactionMinAggregateInputType = {
    id?: true;
    userId?: true;
    fundId?: true;
    type?: true;
    amount?: true;
    units?: true;
    nav?: true;
    date?: true;
    status?: true;
    createdAt?: true;
  };

  export type TransactionMaxAggregateInputType = {
    id?: true;
    userId?: true;
    fundId?: true;
    type?: true;
    amount?: true;
    units?: true;
    nav?: true;
    date?: true;
    status?: true;
    createdAt?: true;
  };

  export type TransactionCountAggregateInputType = {
    id?: true;
    userId?: true;
    fundId?: true;
    type?: true;
    amount?: true;
    units?: true;
    nav?: true;
    date?: true;
    status?: true;
    createdAt?: true;
    _all?: true;
  };

  export type TransactionAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Transaction to aggregate.
     */
    where?: TransactionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Transactions to fetch.
     */
    orderBy?:
      | TransactionOrderByWithRelationInput
      | TransactionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: TransactionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Transactions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Transactions
     **/
    _count?: true | TransactionCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: TransactionAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: TransactionSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: TransactionMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: TransactionMaxAggregateInputType;
  };

  export type GetTransactionAggregateType<T extends TransactionAggregateArgs> =
    {
      [P in keyof T & keyof AggregateTransaction]: P extends '_count' | 'count'
        ? T[P] extends true
          ? number
          : GetScalarType<T[P], AggregateTransaction[P]>
        : GetScalarType<T[P], AggregateTransaction[P]>;
    };

  export type TransactionGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: TransactionWhereInput;
    orderBy?:
      | TransactionOrderByWithAggregationInput
      | TransactionOrderByWithAggregationInput[];
    by: TransactionScalarFieldEnum[] | TransactionScalarFieldEnum;
    having?: TransactionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: TransactionCountAggregateInputType | true;
    _avg?: TransactionAvgAggregateInputType;
    _sum?: TransactionSumAggregateInputType;
    _min?: TransactionMinAggregateInputType;
    _max?: TransactionMaxAggregateInputType;
  };

  export type TransactionGroupByOutputType = {
    id: string;
    userId: string;
    fundId: string;
    type: $Enums.TransactionType;
    amount: Decimal;
    units: Decimal;
    nav: Decimal;
    date: Date;
    status: $Enums.TransactionStatus;
    createdAt: Date;
    _count: TransactionCountAggregateOutputType | null;
    _avg: TransactionAvgAggregateOutputType | null;
    _sum: TransactionSumAggregateOutputType | null;
    _min: TransactionMinAggregateOutputType | null;
    _max: TransactionMaxAggregateOutputType | null;
  };

  type GetTransactionGroupByPayload<T extends TransactionGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<TransactionGroupByOutputType, T['by']> & {
          [P in keyof T &
            keyof TransactionGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TransactionGroupByOutputType[P]>
            : GetScalarType<T[P], TransactionGroupByOutputType[P]>;
        }
      >
    >;

  export type TransactionSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      fundId?: boolean;
      type?: boolean;
      amount?: boolean;
      units?: boolean;
      nav?: boolean;
      date?: boolean;
      status?: boolean;
      createdAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
      fund?: boolean | FundDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['transaction']
  >;

  export type TransactionSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      fundId?: boolean;
      type?: boolean;
      amount?: boolean;
      units?: boolean;
      nav?: boolean;
      date?: boolean;
      status?: boolean;
      createdAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
      fund?: boolean | FundDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['transaction']
  >;

  export type TransactionSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      fundId?: boolean;
      type?: boolean;
      amount?: boolean;
      units?: boolean;
      nav?: boolean;
      date?: boolean;
      status?: boolean;
      createdAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
      fund?: boolean | FundDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['transaction']
  >;

  export type TransactionSelectScalar = {
    id?: boolean;
    userId?: boolean;
    fundId?: boolean;
    type?: boolean;
    amount?: boolean;
    units?: boolean;
    nav?: boolean;
    date?: boolean;
    status?: boolean;
    createdAt?: boolean;
  };

  export type TransactionOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    | 'id'
    | 'userId'
    | 'fundId'
    | 'type'
    | 'amount'
    | 'units'
    | 'nav'
    | 'date'
    | 'status'
    | 'createdAt',
    ExtArgs['result']['transaction']
  >;
  export type TransactionInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
    fund?: boolean | FundDefaultArgs<ExtArgs>;
  };
  export type TransactionIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
    fund?: boolean | FundDefaultArgs<ExtArgs>;
  };
  export type TransactionIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
    fund?: boolean | FundDefaultArgs<ExtArgs>;
  };

  export type $TransactionPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'Transaction';
    objects: {
      user: Prisma.$UserPayload<ExtArgs>;
      fund: Prisma.$FundPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        userId: string;
        fundId: string;
        type: $Enums.TransactionType;
        amount: Prisma.Decimal;
        units: Prisma.Decimal;
        nav: Prisma.Decimal;
        date: Date;
        status: $Enums.TransactionStatus;
        createdAt: Date;
      },
      ExtArgs['result']['transaction']
    >;
    composites: {};
  };

  type TransactionGetPayload<
    S extends boolean | null | undefined | TransactionDefaultArgs,
  > = $Result.GetResult<Prisma.$TransactionPayload, S>;

  type TransactionCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<
    TransactionFindManyArgs,
    'select' | 'include' | 'distinct' | 'omit'
  > & {
    select?: TransactionCountAggregateInputType | true;
  };

  export interface TransactionDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['Transaction'];
      meta: { name: 'Transaction' };
    };
    /**
     * Find zero or one Transaction that matches the filter.
     * @param {TransactionFindUniqueArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TransactionFindUniqueArgs>(
      args: SelectSubset<T, TransactionFindUniqueArgs<ExtArgs>>,
    ): Prisma__TransactionClient<
      $Result.GetResult<
        Prisma.$TransactionPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Transaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TransactionFindUniqueOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TransactionFindUniqueOrThrowArgs>(
      args: SelectSubset<T, TransactionFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__TransactionClient<
      $Result.GetResult<
        Prisma.$TransactionPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Transaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TransactionFindFirstArgs>(
      args?: SelectSubset<T, TransactionFindFirstArgs<ExtArgs>>,
    ): Prisma__TransactionClient<
      $Result.GetResult<
        Prisma.$TransactionPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Transaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TransactionFindFirstOrThrowArgs>(
      args?: SelectSubset<T, TransactionFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__TransactionClient<
      $Result.GetResult<
        Prisma.$TransactionPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Transactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Transactions
     * const transactions = await prisma.transaction.findMany()
     *
     * // Get first 10 Transactions
     * const transactions = await prisma.transaction.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const transactionWithIdOnly = await prisma.transaction.findMany({ select: { id: true } })
     *
     */
    findMany<T extends TransactionFindManyArgs>(
      args?: SelectSubset<T, TransactionFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$TransactionPayload<ExtArgs>,
        T,
        'findMany',
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Transaction.
     * @param {TransactionCreateArgs} args - Arguments to create a Transaction.
     * @example
     * // Create one Transaction
     * const Transaction = await prisma.transaction.create({
     *   data: {
     *     // ... data to create a Transaction
     *   }
     * })
     *
     */
    create<T extends TransactionCreateArgs>(
      args: SelectSubset<T, TransactionCreateArgs<ExtArgs>>,
    ): Prisma__TransactionClient<
      $Result.GetResult<
        Prisma.$TransactionPayload<ExtArgs>,
        T,
        'create',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Transactions.
     * @param {TransactionCreateManyArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transaction = await prisma.transaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends TransactionCreateManyArgs>(
      args?: SelectSubset<T, TransactionCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Transactions and returns the data saved in the database.
     * @param {TransactionCreateManyAndReturnArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transaction = await prisma.transaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Transactions and only return the `id`
     * const transactionWithIdOnly = await prisma.transaction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends TransactionCreateManyAndReturnArgs>(
      args?: SelectSubset<T, TransactionCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$TransactionPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Transaction.
     * @param {TransactionDeleteArgs} args - Arguments to delete one Transaction.
     * @example
     * // Delete one Transaction
     * const Transaction = await prisma.transaction.delete({
     *   where: {
     *     // ... filter to delete one Transaction
     *   }
     * })
     *
     */
    delete<T extends TransactionDeleteArgs>(
      args: SelectSubset<T, TransactionDeleteArgs<ExtArgs>>,
    ): Prisma__TransactionClient<
      $Result.GetResult<
        Prisma.$TransactionPayload<ExtArgs>,
        T,
        'delete',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Transaction.
     * @param {TransactionUpdateArgs} args - Arguments to update one Transaction.
     * @example
     * // Update one Transaction
     * const transaction = await prisma.transaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends TransactionUpdateArgs>(
      args: SelectSubset<T, TransactionUpdateArgs<ExtArgs>>,
    ): Prisma__TransactionClient<
      $Result.GetResult<
        Prisma.$TransactionPayload<ExtArgs>,
        T,
        'update',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Transactions.
     * @param {TransactionDeleteManyArgs} args - Arguments to filter Transactions to delete.
     * @example
     * // Delete a few Transactions
     * const { count } = await prisma.transaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends TransactionDeleteManyArgs>(
      args?: SelectSubset<T, TransactionDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends TransactionUpdateManyArgs>(
      args: SelectSubset<T, TransactionUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Transactions and returns the data updated in the database.
     * @param {TransactionUpdateManyAndReturnArgs} args - Arguments to update many Transactions.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Transactions and only return the `id`
     * const transactionWithIdOnly = await prisma.transaction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends TransactionUpdateManyAndReturnArgs>(
      args: SelectSubset<T, TransactionUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$TransactionPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Transaction.
     * @param {TransactionUpsertArgs} args - Arguments to update or create a Transaction.
     * @example
     * // Update or create a Transaction
     * const transaction = await prisma.transaction.upsert({
     *   create: {
     *     // ... data to create a Transaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Transaction we want to update
     *   }
     * })
     */
    upsert<T extends TransactionUpsertArgs>(
      args: SelectSubset<T, TransactionUpsertArgs<ExtArgs>>,
    ): Prisma__TransactionClient<
      $Result.GetResult<
        Prisma.$TransactionPayload<ExtArgs>,
        T,
        'upsert',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionCountArgs} args - Arguments to filter Transactions to count.
     * @example
     * // Count the number of Transactions
     * const count = await prisma.transaction.count({
     *   where: {
     *     // ... the filter for the Transactions we want to count
     *   }
     * })
     **/
    count<T extends TransactionCountArgs>(
      args?: Subset<T, TransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TransactionCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends TransactionAggregateArgs>(
      args: Subset<T, TransactionAggregateArgs>,
    ): Prisma.PrismaPromise<GetTransactionAggregateType<T>>;

    /**
     * Group by Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends TransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TransactionGroupByArgs['orderBy'] }
        : { orderBy?: TransactionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      'Field ',
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, TransactionGroupByArgs, OrderByArg> &
        InputErrors,
    ): {} extends InputErrors
      ? GetTransactionGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Transaction model
     */
    readonly fields: TransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Transaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TransactionClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    user<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>,
    ): Prisma__UserClient<
      | $Result.GetResult<
          Prisma.$UserPayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    fund<T extends FundDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, FundDefaultArgs<ExtArgs>>,
    ): Prisma__FundClient<
      | $Result.GetResult<
          Prisma.$FundPayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Transaction model
   */
  interface TransactionFieldRefs {
    readonly id: FieldRef<'Transaction', 'String'>;
    readonly userId: FieldRef<'Transaction', 'String'>;
    readonly fundId: FieldRef<'Transaction', 'String'>;
    readonly type: FieldRef<'Transaction', 'TransactionType'>;
    readonly amount: FieldRef<'Transaction', 'Decimal'>;
    readonly units: FieldRef<'Transaction', 'Decimal'>;
    readonly nav: FieldRef<'Transaction', 'Decimal'>;
    readonly date: FieldRef<'Transaction', 'DateTime'>;
    readonly status: FieldRef<'Transaction', 'TransactionStatus'>;
    readonly createdAt: FieldRef<'Transaction', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * Transaction findUnique
   */
  export type TransactionFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null;
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput;
  };

  /**
   * Transaction findUniqueOrThrow
   */
  export type TransactionFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null;
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput;
  };

  /**
   * Transaction findFirst
   */
  export type TransactionFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null;
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Transactions to fetch.
     */
    orderBy?:
      | TransactionOrderByWithRelationInput
      | TransactionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Transactions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[];
  };

  /**
   * Transaction findFirstOrThrow
   */
  export type TransactionFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null;
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Transactions to fetch.
     */
    orderBy?:
      | TransactionOrderByWithRelationInput
      | TransactionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Transactions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[];
  };

  /**
   * Transaction findMany
   */
  export type TransactionFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null;
    /**
     * Filter, which Transactions to fetch.
     */
    where?: TransactionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Transactions to fetch.
     */
    orderBy?:
      | TransactionOrderByWithRelationInput
      | TransactionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Transactions.
     */
    cursor?: TransactionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Transactions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[];
  };

  /**
   * Transaction create
   */
  export type TransactionCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null;
    /**
     * The data needed to create a Transaction.
     */
    data: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>;
  };

  /**
   * Transaction createMany
   */
  export type TransactionCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Transactions.
     */
    data: TransactionCreateManyInput | TransactionCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Transaction createManyAndReturn
   */
  export type TransactionCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null;
    /**
     * The data used to create many Transactions.
     */
    data: TransactionCreateManyInput | TransactionCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Transaction update
   */
  export type TransactionUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null;
    /**
     * The data needed to update a Transaction.
     */
    data: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>;
    /**
     * Choose, which Transaction to update.
     */
    where: TransactionWhereUniqueInput;
  };

  /**
   * Transaction updateMany
   */
  export type TransactionUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Transactions.
     */
    data: XOR<
      TransactionUpdateManyMutationInput,
      TransactionUncheckedUpdateManyInput
    >;
    /**
     * Filter which Transactions to update
     */
    where?: TransactionWhereInput;
    /**
     * Limit how many Transactions to update.
     */
    limit?: number;
  };

  /**
   * Transaction updateManyAndReturn
   */
  export type TransactionUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null;
    /**
     * The data used to update Transactions.
     */
    data: XOR<
      TransactionUpdateManyMutationInput,
      TransactionUncheckedUpdateManyInput
    >;
    /**
     * Filter which Transactions to update
     */
    where?: TransactionWhereInput;
    /**
     * Limit how many Transactions to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Transaction upsert
   */
  export type TransactionUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null;
    /**
     * The filter to search for the Transaction to update in case it exists.
     */
    where: TransactionWhereUniqueInput;
    /**
     * In case the Transaction found by the `where` argument doesn't exist, create a new Transaction with this data.
     */
    create: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>;
    /**
     * In case the Transaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>;
  };

  /**
   * Transaction delete
   */
  export type TransactionDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null;
    /**
     * Filter which Transaction to delete.
     */
    where: TransactionWhereUniqueInput;
  };

  /**
   * Transaction deleteMany
   */
  export type TransactionDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Transactions to delete
     */
    where?: TransactionWhereInput;
    /**
     * Limit how many Transactions to delete.
     */
    limit?: number;
  };

  /**
   * Transaction without action
   */
  export type TransactionDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null;
  };

  /**
   * Model Watchlist
   */

  export type AggregateWatchlist = {
    _count: WatchlistCountAggregateOutputType | null;
    _min: WatchlistMinAggregateOutputType | null;
    _max: WatchlistMaxAggregateOutputType | null;
  };

  export type WatchlistMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    fundId: string | null;
    addedAt: Date | null;
    createdAt: Date | null;
  };

  export type WatchlistMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    fundId: string | null;
    addedAt: Date | null;
    createdAt: Date | null;
  };

  export type WatchlistCountAggregateOutputType = {
    id: number;
    userId: number;
    fundId: number;
    addedAt: number;
    createdAt: number;
    _all: number;
  };

  export type WatchlistMinAggregateInputType = {
    id?: true;
    userId?: true;
    fundId?: true;
    addedAt?: true;
    createdAt?: true;
  };

  export type WatchlistMaxAggregateInputType = {
    id?: true;
    userId?: true;
    fundId?: true;
    addedAt?: true;
    createdAt?: true;
  };

  export type WatchlistCountAggregateInputType = {
    id?: true;
    userId?: true;
    fundId?: true;
    addedAt?: true;
    createdAt?: true;
    _all?: true;
  };

  export type WatchlistAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Watchlist to aggregate.
     */
    where?: WatchlistWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Watchlists to fetch.
     */
    orderBy?:
      | WatchlistOrderByWithRelationInput
      | WatchlistOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: WatchlistWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Watchlists from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Watchlists.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Watchlists
     **/
    _count?: true | WatchlistCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: WatchlistMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: WatchlistMaxAggregateInputType;
  };

  export type GetWatchlistAggregateType<T extends WatchlistAggregateArgs> = {
    [P in keyof T & keyof AggregateWatchlist]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWatchlist[P]>
      : GetScalarType<T[P], AggregateWatchlist[P]>;
  };

  export type WatchlistGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: WatchlistWhereInput;
    orderBy?:
      | WatchlistOrderByWithAggregationInput
      | WatchlistOrderByWithAggregationInput[];
    by: WatchlistScalarFieldEnum[] | WatchlistScalarFieldEnum;
    having?: WatchlistScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: WatchlistCountAggregateInputType | true;
    _min?: WatchlistMinAggregateInputType;
    _max?: WatchlistMaxAggregateInputType;
  };

  export type WatchlistGroupByOutputType = {
    id: string;
    userId: string;
    fundId: string;
    addedAt: Date;
    createdAt: Date;
    _count: WatchlistCountAggregateOutputType | null;
    _min: WatchlistMinAggregateOutputType | null;
    _max: WatchlistMaxAggregateOutputType | null;
  };

  type GetWatchlistGroupByPayload<T extends WatchlistGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<WatchlistGroupByOutputType, T['by']> & {
          [P in keyof T & keyof WatchlistGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WatchlistGroupByOutputType[P]>
            : GetScalarType<T[P], WatchlistGroupByOutputType[P]>;
        }
      >
    >;

  export type WatchlistSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      fundId?: boolean;
      addedAt?: boolean;
      createdAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
      fund?: boolean | FundDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['watchlist']
  >;

  export type WatchlistSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      fundId?: boolean;
      addedAt?: boolean;
      createdAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
      fund?: boolean | FundDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['watchlist']
  >;

  export type WatchlistSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      fundId?: boolean;
      addedAt?: boolean;
      createdAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
      fund?: boolean | FundDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['watchlist']
  >;

  export type WatchlistSelectScalar = {
    id?: boolean;
    userId?: boolean;
    fundId?: boolean;
    addedAt?: boolean;
    createdAt?: boolean;
  };

  export type WatchlistOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    'id' | 'userId' | 'fundId' | 'addedAt' | 'createdAt',
    ExtArgs['result']['watchlist']
  >;
  export type WatchlistInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
    fund?: boolean | FundDefaultArgs<ExtArgs>;
  };
  export type WatchlistIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
    fund?: boolean | FundDefaultArgs<ExtArgs>;
  };
  export type WatchlistIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
    fund?: boolean | FundDefaultArgs<ExtArgs>;
  };

  export type $WatchlistPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'Watchlist';
    objects: {
      user: Prisma.$UserPayload<ExtArgs>;
      fund: Prisma.$FundPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        userId: string;
        fundId: string;
        addedAt: Date;
        createdAt: Date;
      },
      ExtArgs['result']['watchlist']
    >;
    composites: {};
  };

  type WatchlistGetPayload<
    S extends boolean | null | undefined | WatchlistDefaultArgs,
  > = $Result.GetResult<Prisma.$WatchlistPayload, S>;

  type WatchlistCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<
    WatchlistFindManyArgs,
    'select' | 'include' | 'distinct' | 'omit'
  > & {
    select?: WatchlistCountAggregateInputType | true;
  };

  export interface WatchlistDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['Watchlist'];
      meta: { name: 'Watchlist' };
    };
    /**
     * Find zero or one Watchlist that matches the filter.
     * @param {WatchlistFindUniqueArgs} args - Arguments to find a Watchlist
     * @example
     * // Get one Watchlist
     * const watchlist = await prisma.watchlist.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WatchlistFindUniqueArgs>(
      args: SelectSubset<T, WatchlistFindUniqueArgs<ExtArgs>>,
    ): Prisma__WatchlistClient<
      $Result.GetResult<
        Prisma.$WatchlistPayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Watchlist that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WatchlistFindUniqueOrThrowArgs} args - Arguments to find a Watchlist
     * @example
     * // Get one Watchlist
     * const watchlist = await prisma.watchlist.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WatchlistFindUniqueOrThrowArgs>(
      args: SelectSubset<T, WatchlistFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__WatchlistClient<
      $Result.GetResult<
        Prisma.$WatchlistPayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Watchlist that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchlistFindFirstArgs} args - Arguments to find a Watchlist
     * @example
     * // Get one Watchlist
     * const watchlist = await prisma.watchlist.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WatchlistFindFirstArgs>(
      args?: SelectSubset<T, WatchlistFindFirstArgs<ExtArgs>>,
    ): Prisma__WatchlistClient<
      $Result.GetResult<
        Prisma.$WatchlistPayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Watchlist that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchlistFindFirstOrThrowArgs} args - Arguments to find a Watchlist
     * @example
     * // Get one Watchlist
     * const watchlist = await prisma.watchlist.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WatchlistFindFirstOrThrowArgs>(
      args?: SelectSubset<T, WatchlistFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__WatchlistClient<
      $Result.GetResult<
        Prisma.$WatchlistPayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Watchlists that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchlistFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Watchlists
     * const watchlists = await prisma.watchlist.findMany()
     *
     * // Get first 10 Watchlists
     * const watchlists = await prisma.watchlist.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const watchlistWithIdOnly = await prisma.watchlist.findMany({ select: { id: true } })
     *
     */
    findMany<T extends WatchlistFindManyArgs>(
      args?: SelectSubset<T, WatchlistFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$WatchlistPayload<ExtArgs>,
        T,
        'findMany',
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Watchlist.
     * @param {WatchlistCreateArgs} args - Arguments to create a Watchlist.
     * @example
     * // Create one Watchlist
     * const Watchlist = await prisma.watchlist.create({
     *   data: {
     *     // ... data to create a Watchlist
     *   }
     * })
     *
     */
    create<T extends WatchlistCreateArgs>(
      args: SelectSubset<T, WatchlistCreateArgs<ExtArgs>>,
    ): Prisma__WatchlistClient<
      $Result.GetResult<
        Prisma.$WatchlistPayload<ExtArgs>,
        T,
        'create',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Watchlists.
     * @param {WatchlistCreateManyArgs} args - Arguments to create many Watchlists.
     * @example
     * // Create many Watchlists
     * const watchlist = await prisma.watchlist.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends WatchlistCreateManyArgs>(
      args?: SelectSubset<T, WatchlistCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Watchlists and returns the data saved in the database.
     * @param {WatchlistCreateManyAndReturnArgs} args - Arguments to create many Watchlists.
     * @example
     * // Create many Watchlists
     * const watchlist = await prisma.watchlist.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Watchlists and only return the `id`
     * const watchlistWithIdOnly = await prisma.watchlist.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends WatchlistCreateManyAndReturnArgs>(
      args?: SelectSubset<T, WatchlistCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$WatchlistPayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Watchlist.
     * @param {WatchlistDeleteArgs} args - Arguments to delete one Watchlist.
     * @example
     * // Delete one Watchlist
     * const Watchlist = await prisma.watchlist.delete({
     *   where: {
     *     // ... filter to delete one Watchlist
     *   }
     * })
     *
     */
    delete<T extends WatchlistDeleteArgs>(
      args: SelectSubset<T, WatchlistDeleteArgs<ExtArgs>>,
    ): Prisma__WatchlistClient<
      $Result.GetResult<
        Prisma.$WatchlistPayload<ExtArgs>,
        T,
        'delete',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Watchlist.
     * @param {WatchlistUpdateArgs} args - Arguments to update one Watchlist.
     * @example
     * // Update one Watchlist
     * const watchlist = await prisma.watchlist.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends WatchlistUpdateArgs>(
      args: SelectSubset<T, WatchlistUpdateArgs<ExtArgs>>,
    ): Prisma__WatchlistClient<
      $Result.GetResult<
        Prisma.$WatchlistPayload<ExtArgs>,
        T,
        'update',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Watchlists.
     * @param {WatchlistDeleteManyArgs} args - Arguments to filter Watchlists to delete.
     * @example
     * // Delete a few Watchlists
     * const { count } = await prisma.watchlist.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends WatchlistDeleteManyArgs>(
      args?: SelectSubset<T, WatchlistDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Watchlists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchlistUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Watchlists
     * const watchlist = await prisma.watchlist.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends WatchlistUpdateManyArgs>(
      args: SelectSubset<T, WatchlistUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Watchlists and returns the data updated in the database.
     * @param {WatchlistUpdateManyAndReturnArgs} args - Arguments to update many Watchlists.
     * @example
     * // Update many Watchlists
     * const watchlist = await prisma.watchlist.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Watchlists and only return the `id`
     * const watchlistWithIdOnly = await prisma.watchlist.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends WatchlistUpdateManyAndReturnArgs>(
      args: SelectSubset<T, WatchlistUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$WatchlistPayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Watchlist.
     * @param {WatchlistUpsertArgs} args - Arguments to update or create a Watchlist.
     * @example
     * // Update or create a Watchlist
     * const watchlist = await prisma.watchlist.upsert({
     *   create: {
     *     // ... data to create a Watchlist
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Watchlist we want to update
     *   }
     * })
     */
    upsert<T extends WatchlistUpsertArgs>(
      args: SelectSubset<T, WatchlistUpsertArgs<ExtArgs>>,
    ): Prisma__WatchlistClient<
      $Result.GetResult<
        Prisma.$WatchlistPayload<ExtArgs>,
        T,
        'upsert',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Watchlists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchlistCountArgs} args - Arguments to filter Watchlists to count.
     * @example
     * // Count the number of Watchlists
     * const count = await prisma.watchlist.count({
     *   where: {
     *     // ... the filter for the Watchlists we want to count
     *   }
     * })
     **/
    count<T extends WatchlistCountArgs>(
      args?: Subset<T, WatchlistCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WatchlistCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Watchlist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchlistAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends WatchlistAggregateArgs>(
      args: Subset<T, WatchlistAggregateArgs>,
    ): Prisma.PrismaPromise<GetWatchlistAggregateType<T>>;

    /**
     * Group by Watchlist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchlistGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends WatchlistGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WatchlistGroupByArgs['orderBy'] }
        : { orderBy?: WatchlistGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      'Field ',
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, WatchlistGroupByArgs, OrderByArg> &
        InputErrors,
    ): {} extends InputErrors
      ? GetWatchlistGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Watchlist model
     */
    readonly fields: WatchlistFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Watchlist.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WatchlistClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    user<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>,
    ): Prisma__UserClient<
      | $Result.GetResult<
          Prisma.$UserPayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    fund<T extends FundDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, FundDefaultArgs<ExtArgs>>,
    ): Prisma__FundClient<
      | $Result.GetResult<
          Prisma.$FundPayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Watchlist model
   */
  interface WatchlistFieldRefs {
    readonly id: FieldRef<'Watchlist', 'String'>;
    readonly userId: FieldRef<'Watchlist', 'String'>;
    readonly fundId: FieldRef<'Watchlist', 'String'>;
    readonly addedAt: FieldRef<'Watchlist', 'DateTime'>;
    readonly createdAt: FieldRef<'Watchlist', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * Watchlist findUnique
   */
  export type WatchlistFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Watchlist
     */
    select?: WatchlistSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Watchlist
     */
    omit?: WatchlistOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistInclude<ExtArgs> | null;
    /**
     * Filter, which Watchlist to fetch.
     */
    where: WatchlistWhereUniqueInput;
  };

  /**
   * Watchlist findUniqueOrThrow
   */
  export type WatchlistFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Watchlist
     */
    select?: WatchlistSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Watchlist
     */
    omit?: WatchlistOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistInclude<ExtArgs> | null;
    /**
     * Filter, which Watchlist to fetch.
     */
    where: WatchlistWhereUniqueInput;
  };

  /**
   * Watchlist findFirst
   */
  export type WatchlistFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Watchlist
     */
    select?: WatchlistSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Watchlist
     */
    omit?: WatchlistOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistInclude<ExtArgs> | null;
    /**
     * Filter, which Watchlist to fetch.
     */
    where?: WatchlistWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Watchlists to fetch.
     */
    orderBy?:
      | WatchlistOrderByWithRelationInput
      | WatchlistOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Watchlists.
     */
    cursor?: WatchlistWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Watchlists from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Watchlists.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Watchlists.
     */
    distinct?: WatchlistScalarFieldEnum | WatchlistScalarFieldEnum[];
  };

  /**
   * Watchlist findFirstOrThrow
   */
  export type WatchlistFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Watchlist
     */
    select?: WatchlistSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Watchlist
     */
    omit?: WatchlistOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistInclude<ExtArgs> | null;
    /**
     * Filter, which Watchlist to fetch.
     */
    where?: WatchlistWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Watchlists to fetch.
     */
    orderBy?:
      | WatchlistOrderByWithRelationInput
      | WatchlistOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Watchlists.
     */
    cursor?: WatchlistWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Watchlists from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Watchlists.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Watchlists.
     */
    distinct?: WatchlistScalarFieldEnum | WatchlistScalarFieldEnum[];
  };

  /**
   * Watchlist findMany
   */
  export type WatchlistFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Watchlist
     */
    select?: WatchlistSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Watchlist
     */
    omit?: WatchlistOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistInclude<ExtArgs> | null;
    /**
     * Filter, which Watchlists to fetch.
     */
    where?: WatchlistWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Watchlists to fetch.
     */
    orderBy?:
      | WatchlistOrderByWithRelationInput
      | WatchlistOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Watchlists.
     */
    cursor?: WatchlistWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Watchlists from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Watchlists.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Watchlists.
     */
    distinct?: WatchlistScalarFieldEnum | WatchlistScalarFieldEnum[];
  };

  /**
   * Watchlist create
   */
  export type WatchlistCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Watchlist
     */
    select?: WatchlistSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Watchlist
     */
    omit?: WatchlistOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistInclude<ExtArgs> | null;
    /**
     * The data needed to create a Watchlist.
     */
    data: XOR<WatchlistCreateInput, WatchlistUncheckedCreateInput>;
  };

  /**
   * Watchlist createMany
   */
  export type WatchlistCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Watchlists.
     */
    data: WatchlistCreateManyInput | WatchlistCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Watchlist createManyAndReturn
   */
  export type WatchlistCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Watchlist
     */
    select?: WatchlistSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Watchlist
     */
    omit?: WatchlistOmit<ExtArgs> | null;
    /**
     * The data used to create many Watchlists.
     */
    data: WatchlistCreateManyInput | WatchlistCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Watchlist update
   */
  export type WatchlistUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Watchlist
     */
    select?: WatchlistSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Watchlist
     */
    omit?: WatchlistOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistInclude<ExtArgs> | null;
    /**
     * The data needed to update a Watchlist.
     */
    data: XOR<WatchlistUpdateInput, WatchlistUncheckedUpdateInput>;
    /**
     * Choose, which Watchlist to update.
     */
    where: WatchlistWhereUniqueInput;
  };

  /**
   * Watchlist updateMany
   */
  export type WatchlistUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Watchlists.
     */
    data: XOR<
      WatchlistUpdateManyMutationInput,
      WatchlistUncheckedUpdateManyInput
    >;
    /**
     * Filter which Watchlists to update
     */
    where?: WatchlistWhereInput;
    /**
     * Limit how many Watchlists to update.
     */
    limit?: number;
  };

  /**
   * Watchlist updateManyAndReturn
   */
  export type WatchlistUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Watchlist
     */
    select?: WatchlistSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Watchlist
     */
    omit?: WatchlistOmit<ExtArgs> | null;
    /**
     * The data used to update Watchlists.
     */
    data: XOR<
      WatchlistUpdateManyMutationInput,
      WatchlistUncheckedUpdateManyInput
    >;
    /**
     * Filter which Watchlists to update
     */
    where?: WatchlistWhereInput;
    /**
     * Limit how many Watchlists to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Watchlist upsert
   */
  export type WatchlistUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Watchlist
     */
    select?: WatchlistSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Watchlist
     */
    omit?: WatchlistOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistInclude<ExtArgs> | null;
    /**
     * The filter to search for the Watchlist to update in case it exists.
     */
    where: WatchlistWhereUniqueInput;
    /**
     * In case the Watchlist found by the `where` argument doesn't exist, create a new Watchlist with this data.
     */
    create: XOR<WatchlistCreateInput, WatchlistUncheckedCreateInput>;
    /**
     * In case the Watchlist was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WatchlistUpdateInput, WatchlistUncheckedUpdateInput>;
  };

  /**
   * Watchlist delete
   */
  export type WatchlistDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Watchlist
     */
    select?: WatchlistSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Watchlist
     */
    omit?: WatchlistOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistInclude<ExtArgs> | null;
    /**
     * Filter which Watchlist to delete.
     */
    where: WatchlistWhereUniqueInput;
  };

  /**
   * Watchlist deleteMany
   */
  export type WatchlistDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Watchlists to delete
     */
    where?: WatchlistWhereInput;
    /**
     * Limit how many Watchlists to delete.
     */
    limit?: number;
  };

  /**
   * Watchlist without action
   */
  export type WatchlistDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Watchlist
     */
    select?: WatchlistSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Watchlist
     */
    omit?: WatchlistOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistInclude<ExtArgs> | null;
  };

  /**
   * Model RiskProfile
   */

  export type AggregateRiskProfile = {
    _count: RiskProfileCountAggregateOutputType | null;
    _avg: RiskProfileAvgAggregateOutputType | null;
    _sum: RiskProfileSumAggregateOutputType | null;
    _min: RiskProfileMinAggregateOutputType | null;
    _max: RiskProfileMaxAggregateOutputType | null;
  };

  export type RiskProfileAvgAggregateOutputType = {
    score: number | null;
  };

  export type RiskProfileSumAggregateOutputType = {
    score: number | null;
  };

  export type RiskProfileMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    score: number | null;
    category: $Enums.RiskCategory | null;
    completedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type RiskProfileMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    score: number | null;
    category: $Enums.RiskCategory | null;
    completedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type RiskProfileCountAggregateOutputType = {
    id: number;
    userId: number;
    score: number;
    category: number;
    answers: number;
    completedAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type RiskProfileAvgAggregateInputType = {
    score?: true;
  };

  export type RiskProfileSumAggregateInputType = {
    score?: true;
  };

  export type RiskProfileMinAggregateInputType = {
    id?: true;
    userId?: true;
    score?: true;
    category?: true;
    completedAt?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type RiskProfileMaxAggregateInputType = {
    id?: true;
    userId?: true;
    score?: true;
    category?: true;
    completedAt?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type RiskProfileCountAggregateInputType = {
    id?: true;
    userId?: true;
    score?: true;
    category?: true;
    answers?: true;
    completedAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type RiskProfileAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which RiskProfile to aggregate.
     */
    where?: RiskProfileWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RiskProfiles to fetch.
     */
    orderBy?:
      | RiskProfileOrderByWithRelationInput
      | RiskProfileOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: RiskProfileWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RiskProfiles from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RiskProfiles.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned RiskProfiles
     **/
    _count?: true | RiskProfileCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: RiskProfileAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: RiskProfileSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: RiskProfileMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: RiskProfileMaxAggregateInputType;
  };

  export type GetRiskProfileAggregateType<T extends RiskProfileAggregateArgs> =
    {
      [P in keyof T & keyof AggregateRiskProfile]: P extends '_count' | 'count'
        ? T[P] extends true
          ? number
          : GetScalarType<T[P], AggregateRiskProfile[P]>
        : GetScalarType<T[P], AggregateRiskProfile[P]>;
    };

  export type RiskProfileGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: RiskProfileWhereInput;
    orderBy?:
      | RiskProfileOrderByWithAggregationInput
      | RiskProfileOrderByWithAggregationInput[];
    by: RiskProfileScalarFieldEnum[] | RiskProfileScalarFieldEnum;
    having?: RiskProfileScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: RiskProfileCountAggregateInputType | true;
    _avg?: RiskProfileAvgAggregateInputType;
    _sum?: RiskProfileSumAggregateInputType;
    _min?: RiskProfileMinAggregateInputType;
    _max?: RiskProfileMaxAggregateInputType;
  };

  export type RiskProfileGroupByOutputType = {
    id: string;
    userId: string;
    score: number;
    category: $Enums.RiskCategory;
    answers: JsonValue;
    completedAt: Date;
    createdAt: Date;
    updatedAt: Date;
    _count: RiskProfileCountAggregateOutputType | null;
    _avg: RiskProfileAvgAggregateOutputType | null;
    _sum: RiskProfileSumAggregateOutputType | null;
    _min: RiskProfileMinAggregateOutputType | null;
    _max: RiskProfileMaxAggregateOutputType | null;
  };

  type GetRiskProfileGroupByPayload<T extends RiskProfileGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<RiskProfileGroupByOutputType, T['by']> & {
          [P in keyof T &
            keyof RiskProfileGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RiskProfileGroupByOutputType[P]>
            : GetScalarType<T[P], RiskProfileGroupByOutputType[P]>;
        }
      >
    >;

  export type RiskProfileSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      score?: boolean;
      category?: boolean;
      answers?: boolean;
      completedAt?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['riskProfile']
  >;

  export type RiskProfileSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      score?: boolean;
      category?: boolean;
      answers?: boolean;
      completedAt?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['riskProfile']
  >;

  export type RiskProfileSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      score?: boolean;
      category?: boolean;
      answers?: boolean;
      completedAt?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['riskProfile']
  >;

  export type RiskProfileSelectScalar = {
    id?: boolean;
    userId?: boolean;
    score?: boolean;
    category?: boolean;
    answers?: boolean;
    completedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type RiskProfileOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetOmit<
    | 'id'
    | 'userId'
    | 'score'
    | 'category'
    | 'answers'
    | 'completedAt'
    | 'createdAt'
    | 'updatedAt',
    ExtArgs['result']['riskProfile']
  >;
  export type RiskProfileInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type RiskProfileIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type RiskProfileIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };

  export type $RiskProfilePayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'RiskProfile';
    objects: {
      user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        userId: string;
        score: number;
        category: $Enums.RiskCategory;
        answers: Prisma.JsonValue;
        completedAt: Date;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs['result']['riskProfile']
    >;
    composites: {};
  };

  type RiskProfileGetPayload<
    S extends boolean | null | undefined | RiskProfileDefaultArgs,
  > = $Result.GetResult<Prisma.$RiskProfilePayload, S>;

  type RiskProfileCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<
    RiskProfileFindManyArgs,
    'select' | 'include' | 'distinct' | 'omit'
  > & {
    select?: RiskProfileCountAggregateInputType | true;
  };

  export interface RiskProfileDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['RiskProfile'];
      meta: { name: 'RiskProfile' };
    };
    /**
     * Find zero or one RiskProfile that matches the filter.
     * @param {RiskProfileFindUniqueArgs} args - Arguments to find a RiskProfile
     * @example
     * // Get one RiskProfile
     * const riskProfile = await prisma.riskProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RiskProfileFindUniqueArgs>(
      args: SelectSubset<T, RiskProfileFindUniqueArgs<ExtArgs>>,
    ): Prisma__RiskProfileClient<
      $Result.GetResult<
        Prisma.$RiskProfilePayload<ExtArgs>,
        T,
        'findUnique',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one RiskProfile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RiskProfileFindUniqueOrThrowArgs} args - Arguments to find a RiskProfile
     * @example
     * // Get one RiskProfile
     * const riskProfile = await prisma.riskProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RiskProfileFindUniqueOrThrowArgs>(
      args: SelectSubset<T, RiskProfileFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__RiskProfileClient<
      $Result.GetResult<
        Prisma.$RiskProfilePayload<ExtArgs>,
        T,
        'findUniqueOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first RiskProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiskProfileFindFirstArgs} args - Arguments to find a RiskProfile
     * @example
     * // Get one RiskProfile
     * const riskProfile = await prisma.riskProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RiskProfileFindFirstArgs>(
      args?: SelectSubset<T, RiskProfileFindFirstArgs<ExtArgs>>,
    ): Prisma__RiskProfileClient<
      $Result.GetResult<
        Prisma.$RiskProfilePayload<ExtArgs>,
        T,
        'findFirst',
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first RiskProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiskProfileFindFirstOrThrowArgs} args - Arguments to find a RiskProfile
     * @example
     * // Get one RiskProfile
     * const riskProfile = await prisma.riskProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RiskProfileFindFirstOrThrowArgs>(
      args?: SelectSubset<T, RiskProfileFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__RiskProfileClient<
      $Result.GetResult<
        Prisma.$RiskProfilePayload<ExtArgs>,
        T,
        'findFirstOrThrow',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more RiskProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiskProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RiskProfiles
     * const riskProfiles = await prisma.riskProfile.findMany()
     *
     * // Get first 10 RiskProfiles
     * const riskProfiles = await prisma.riskProfile.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const riskProfileWithIdOnly = await prisma.riskProfile.findMany({ select: { id: true } })
     *
     */
    findMany<T extends RiskProfileFindManyArgs>(
      args?: SelectSubset<T, RiskProfileFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$RiskProfilePayload<ExtArgs>,
        T,
        'findMany',
        GlobalOmitOptions
      >
    >;

    /**
     * Create a RiskProfile.
     * @param {RiskProfileCreateArgs} args - Arguments to create a RiskProfile.
     * @example
     * // Create one RiskProfile
     * const RiskProfile = await prisma.riskProfile.create({
     *   data: {
     *     // ... data to create a RiskProfile
     *   }
     * })
     *
     */
    create<T extends RiskProfileCreateArgs>(
      args: SelectSubset<T, RiskProfileCreateArgs<ExtArgs>>,
    ): Prisma__RiskProfileClient<
      $Result.GetResult<
        Prisma.$RiskProfilePayload<ExtArgs>,
        T,
        'create',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many RiskProfiles.
     * @param {RiskProfileCreateManyArgs} args - Arguments to create many RiskProfiles.
     * @example
     * // Create many RiskProfiles
     * const riskProfile = await prisma.riskProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends RiskProfileCreateManyArgs>(
      args?: SelectSubset<T, RiskProfileCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many RiskProfiles and returns the data saved in the database.
     * @param {RiskProfileCreateManyAndReturnArgs} args - Arguments to create many RiskProfiles.
     * @example
     * // Create many RiskProfiles
     * const riskProfile = await prisma.riskProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many RiskProfiles and only return the `id`
     * const riskProfileWithIdOnly = await prisma.riskProfile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends RiskProfileCreateManyAndReturnArgs>(
      args?: SelectSubset<T, RiskProfileCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$RiskProfilePayload<ExtArgs>,
        T,
        'createManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a RiskProfile.
     * @param {RiskProfileDeleteArgs} args - Arguments to delete one RiskProfile.
     * @example
     * // Delete one RiskProfile
     * const RiskProfile = await prisma.riskProfile.delete({
     *   where: {
     *     // ... filter to delete one RiskProfile
     *   }
     * })
     *
     */
    delete<T extends RiskProfileDeleteArgs>(
      args: SelectSubset<T, RiskProfileDeleteArgs<ExtArgs>>,
    ): Prisma__RiskProfileClient<
      $Result.GetResult<
        Prisma.$RiskProfilePayload<ExtArgs>,
        T,
        'delete',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one RiskProfile.
     * @param {RiskProfileUpdateArgs} args - Arguments to update one RiskProfile.
     * @example
     * // Update one RiskProfile
     * const riskProfile = await prisma.riskProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends RiskProfileUpdateArgs>(
      args: SelectSubset<T, RiskProfileUpdateArgs<ExtArgs>>,
    ): Prisma__RiskProfileClient<
      $Result.GetResult<
        Prisma.$RiskProfilePayload<ExtArgs>,
        T,
        'update',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more RiskProfiles.
     * @param {RiskProfileDeleteManyArgs} args - Arguments to filter RiskProfiles to delete.
     * @example
     * // Delete a few RiskProfiles
     * const { count } = await prisma.riskProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends RiskProfileDeleteManyArgs>(
      args?: SelectSubset<T, RiskProfileDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more RiskProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiskProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RiskProfiles
     * const riskProfile = await prisma.riskProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends RiskProfileUpdateManyArgs>(
      args: SelectSubset<T, RiskProfileUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more RiskProfiles and returns the data updated in the database.
     * @param {RiskProfileUpdateManyAndReturnArgs} args - Arguments to update many RiskProfiles.
     * @example
     * // Update many RiskProfiles
     * const riskProfile = await prisma.riskProfile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more RiskProfiles and only return the `id`
     * const riskProfileWithIdOnly = await prisma.riskProfile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends RiskProfileUpdateManyAndReturnArgs>(
      args: SelectSubset<T, RiskProfileUpdateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$RiskProfilePayload<ExtArgs>,
        T,
        'updateManyAndReturn',
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one RiskProfile.
     * @param {RiskProfileUpsertArgs} args - Arguments to update or create a RiskProfile.
     * @example
     * // Update or create a RiskProfile
     * const riskProfile = await prisma.riskProfile.upsert({
     *   create: {
     *     // ... data to create a RiskProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RiskProfile we want to update
     *   }
     * })
     */
    upsert<T extends RiskProfileUpsertArgs>(
      args: SelectSubset<T, RiskProfileUpsertArgs<ExtArgs>>,
    ): Prisma__RiskProfileClient<
      $Result.GetResult<
        Prisma.$RiskProfilePayload<ExtArgs>,
        T,
        'upsert',
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of RiskProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiskProfileCountArgs} args - Arguments to filter RiskProfiles to count.
     * @example
     * // Count the number of RiskProfiles
     * const count = await prisma.riskProfile.count({
     *   where: {
     *     // ... the filter for the RiskProfiles we want to count
     *   }
     * })
     **/
    count<T extends RiskProfileCountArgs>(
      args?: Subset<T, RiskProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RiskProfileCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a RiskProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiskProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends RiskProfileAggregateArgs>(
      args: Subset<T, RiskProfileAggregateArgs>,
    ): Prisma.PrismaPromise<GetRiskProfileAggregateType<T>>;

    /**
     * Group by RiskProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiskProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends RiskProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RiskProfileGroupByArgs['orderBy'] }
        : { orderBy?: RiskProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T['orderBy']>>
      >,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [
                      Error,
                      'Field ',
                      P,
                      ` in "having" needs to be provided in "by"`,
                    ];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, RiskProfileGroupByArgs, OrderByArg> &
        InputErrors,
    ): {} extends InputErrors
      ? GetRiskProfileGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the RiskProfile model
     */
    readonly fields: RiskProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RiskProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RiskProfileClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {},
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    user<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>,
    ): Prisma__UserClient<
      | $Result.GetResult<
          Prisma.$UserPayload<ExtArgs>,
          T,
          'findUniqueOrThrow',
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the RiskProfile model
   */
  interface RiskProfileFieldRefs {
    readonly id: FieldRef<'RiskProfile', 'String'>;
    readonly userId: FieldRef<'RiskProfile', 'String'>;
    readonly score: FieldRef<'RiskProfile', 'Int'>;
    readonly category: FieldRef<'RiskProfile', 'RiskCategory'>;
    readonly answers: FieldRef<'RiskProfile', 'Json'>;
    readonly completedAt: FieldRef<'RiskProfile', 'DateTime'>;
    readonly createdAt: FieldRef<'RiskProfile', 'DateTime'>;
    readonly updatedAt: FieldRef<'RiskProfile', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * RiskProfile findUnique
   */
  export type RiskProfileFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RiskProfile
     */
    select?: RiskProfileSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RiskProfile
     */
    omit?: RiskProfileOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiskProfileInclude<ExtArgs> | null;
    /**
     * Filter, which RiskProfile to fetch.
     */
    where: RiskProfileWhereUniqueInput;
  };

  /**
   * RiskProfile findUniqueOrThrow
   */
  export type RiskProfileFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RiskProfile
     */
    select?: RiskProfileSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RiskProfile
     */
    omit?: RiskProfileOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiskProfileInclude<ExtArgs> | null;
    /**
     * Filter, which RiskProfile to fetch.
     */
    where: RiskProfileWhereUniqueInput;
  };

  /**
   * RiskProfile findFirst
   */
  export type RiskProfileFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RiskProfile
     */
    select?: RiskProfileSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RiskProfile
     */
    omit?: RiskProfileOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiskProfileInclude<ExtArgs> | null;
    /**
     * Filter, which RiskProfile to fetch.
     */
    where?: RiskProfileWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RiskProfiles to fetch.
     */
    orderBy?:
      | RiskProfileOrderByWithRelationInput
      | RiskProfileOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for RiskProfiles.
     */
    cursor?: RiskProfileWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RiskProfiles from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RiskProfiles.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of RiskProfiles.
     */
    distinct?: RiskProfileScalarFieldEnum | RiskProfileScalarFieldEnum[];
  };

  /**
   * RiskProfile findFirstOrThrow
   */
  export type RiskProfileFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RiskProfile
     */
    select?: RiskProfileSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RiskProfile
     */
    omit?: RiskProfileOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiskProfileInclude<ExtArgs> | null;
    /**
     * Filter, which RiskProfile to fetch.
     */
    where?: RiskProfileWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RiskProfiles to fetch.
     */
    orderBy?:
      | RiskProfileOrderByWithRelationInput
      | RiskProfileOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for RiskProfiles.
     */
    cursor?: RiskProfileWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RiskProfiles from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RiskProfiles.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of RiskProfiles.
     */
    distinct?: RiskProfileScalarFieldEnum | RiskProfileScalarFieldEnum[];
  };

  /**
   * RiskProfile findMany
   */
  export type RiskProfileFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RiskProfile
     */
    select?: RiskProfileSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RiskProfile
     */
    omit?: RiskProfileOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiskProfileInclude<ExtArgs> | null;
    /**
     * Filter, which RiskProfiles to fetch.
     */
    where?: RiskProfileWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RiskProfiles to fetch.
     */
    orderBy?:
      | RiskProfileOrderByWithRelationInput
      | RiskProfileOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing RiskProfiles.
     */
    cursor?: RiskProfileWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RiskProfiles from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RiskProfiles.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of RiskProfiles.
     */
    distinct?: RiskProfileScalarFieldEnum | RiskProfileScalarFieldEnum[];
  };

  /**
   * RiskProfile create
   */
  export type RiskProfileCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RiskProfile
     */
    select?: RiskProfileSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RiskProfile
     */
    omit?: RiskProfileOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiskProfileInclude<ExtArgs> | null;
    /**
     * The data needed to create a RiskProfile.
     */
    data: XOR<RiskProfileCreateInput, RiskProfileUncheckedCreateInput>;
  };

  /**
   * RiskProfile createMany
   */
  export type RiskProfileCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many RiskProfiles.
     */
    data: RiskProfileCreateManyInput | RiskProfileCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * RiskProfile createManyAndReturn
   */
  export type RiskProfileCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RiskProfile
     */
    select?: RiskProfileSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the RiskProfile
     */
    omit?: RiskProfileOmit<ExtArgs> | null;
    /**
     * The data used to create many RiskProfiles.
     */
    data: RiskProfileCreateManyInput | RiskProfileCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiskProfileIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * RiskProfile update
   */
  export type RiskProfileUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RiskProfile
     */
    select?: RiskProfileSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RiskProfile
     */
    omit?: RiskProfileOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiskProfileInclude<ExtArgs> | null;
    /**
     * The data needed to update a RiskProfile.
     */
    data: XOR<RiskProfileUpdateInput, RiskProfileUncheckedUpdateInput>;
    /**
     * Choose, which RiskProfile to update.
     */
    where: RiskProfileWhereUniqueInput;
  };

  /**
   * RiskProfile updateMany
   */
  export type RiskProfileUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update RiskProfiles.
     */
    data: XOR<
      RiskProfileUpdateManyMutationInput,
      RiskProfileUncheckedUpdateManyInput
    >;
    /**
     * Filter which RiskProfiles to update
     */
    where?: RiskProfileWhereInput;
    /**
     * Limit how many RiskProfiles to update.
     */
    limit?: number;
  };

  /**
   * RiskProfile updateManyAndReturn
   */
  export type RiskProfileUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RiskProfile
     */
    select?: RiskProfileSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the RiskProfile
     */
    omit?: RiskProfileOmit<ExtArgs> | null;
    /**
     * The data used to update RiskProfiles.
     */
    data: XOR<
      RiskProfileUpdateManyMutationInput,
      RiskProfileUncheckedUpdateManyInput
    >;
    /**
     * Filter which RiskProfiles to update
     */
    where?: RiskProfileWhereInput;
    /**
     * Limit how many RiskProfiles to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiskProfileIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * RiskProfile upsert
   */
  export type RiskProfileUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RiskProfile
     */
    select?: RiskProfileSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RiskProfile
     */
    omit?: RiskProfileOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiskProfileInclude<ExtArgs> | null;
    /**
     * The filter to search for the RiskProfile to update in case it exists.
     */
    where: RiskProfileWhereUniqueInput;
    /**
     * In case the RiskProfile found by the `where` argument doesn't exist, create a new RiskProfile with this data.
     */
    create: XOR<RiskProfileCreateInput, RiskProfileUncheckedCreateInput>;
    /**
     * In case the RiskProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RiskProfileUpdateInput, RiskProfileUncheckedUpdateInput>;
  };

  /**
   * RiskProfile delete
   */
  export type RiskProfileDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RiskProfile
     */
    select?: RiskProfileSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RiskProfile
     */
    omit?: RiskProfileOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiskProfileInclude<ExtArgs> | null;
    /**
     * Filter which RiskProfile to delete.
     */
    where: RiskProfileWhereUniqueInput;
  };

  /**
   * RiskProfile deleteMany
   */
  export type RiskProfileDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which RiskProfiles to delete
     */
    where?: RiskProfileWhereInput;
    /**
     * Limit how many RiskProfiles to delete.
     */
    limit?: number;
  };

  /**
   * RiskProfile without action
   */
  export type RiskProfileDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RiskProfile
     */
    select?: RiskProfileSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RiskProfile
     */
    omit?: RiskProfileOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiskProfileInclude<ExtArgs> | null;
  };

  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted';
    ReadCommitted: 'ReadCommitted';
    RepeatableRead: 'RepeatableRead';
    Serializable: 'Serializable';
  };

  export type TransactionIsolationLevel =
    (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];

  export const UserScalarFieldEnum: {
    id: 'id';
    name: 'name';
    email: 'email';
    emailVerified: 'emailVerified';
    password: 'password';
    image: 'image';
    role: 'role';
    kycStatus: 'kycStatus';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type UserScalarFieldEnum =
    (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];

  export const AccountScalarFieldEnum: {
    id: 'id';
    userId: 'userId';
    type: 'type';
    provider: 'provider';
    providerAccountId: 'providerAccountId';
    refresh_token: 'refresh_token';
    access_token: 'access_token';
    expires_at: 'expires_at';
    token_type: 'token_type';
    scope: 'scope';
    id_token: 'id_token';
    session_state: 'session_state';
  };

  export type AccountScalarFieldEnum =
    (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum];

  export const SessionScalarFieldEnum: {
    id: 'id';
    sessionToken: 'sessionToken';
    userId: 'userId';
    expires: 'expires';
  };

  export type SessionScalarFieldEnum =
    (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum];

  export const VerificationTokenScalarFieldEnum: {
    identifier: 'identifier';
    token: 'token';
    expires: 'expires';
  };

  export type VerificationTokenScalarFieldEnum =
    (typeof VerificationTokenScalarFieldEnum)[keyof typeof VerificationTokenScalarFieldEnum];

  export const FundScalarFieldEnum: {
    id: 'id';
    schemeCode: 'schemeCode';
    schemeName: 'schemeName';
    amcName: 'amcName';
    category: 'category';
    subCategory: 'subCategory';
    nav: 'nav';
    aum: 'aum';
    expenseRatio: 'expenseRatio';
    sharpeRatio: 'sharpeRatio';
    alpha: 'alpha';
    beta: 'beta';
    stdDeviation: 'stdDeviation';
    returns1y: 'returns1y';
    returns3y: 'returns3y';
    returns5y: 'returns5y';
    returns10y: 'returns10y';
    managerName: 'managerName';
    launchDate: 'launchDate';
    benchmarkIndex: 'benchmarkIndex';
    isActive: 'isActive';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type FundScalarFieldEnum =
    (typeof FundScalarFieldEnum)[keyof typeof FundScalarFieldEnum];

  export const NavHistoryScalarFieldEnum: {
    id: 'id';
    fundId: 'fundId';
    nav: 'nav';
    date: 'date';
    createdAt: 'createdAt';
  };

  export type NavHistoryScalarFieldEnum =
    (typeof NavHistoryScalarFieldEnum)[keyof typeof NavHistoryScalarFieldEnum];

  export const PortfolioScalarFieldEnum: {
    id: 'id';
    userId: 'userId';
    name: 'name';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type PortfolioScalarFieldEnum =
    (typeof PortfolioScalarFieldEnum)[keyof typeof PortfolioScalarFieldEnum];

  export const HoldingScalarFieldEnum: {
    id: 'id';
    portfolioId: 'portfolioId';
    fundId: 'fundId';
    units: 'units';
    avgNav: 'avgNav';
    investedAmount: 'investedAmount';
    purchaseDate: 'purchaseDate';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type HoldingScalarFieldEnum =
    (typeof HoldingScalarFieldEnum)[keyof typeof HoldingScalarFieldEnum];

  export const TransactionScalarFieldEnum: {
    id: 'id';
    userId: 'userId';
    fundId: 'fundId';
    type: 'type';
    amount: 'amount';
    units: 'units';
    nav: 'nav';
    date: 'date';
    status: 'status';
    createdAt: 'createdAt';
  };

  export type TransactionScalarFieldEnum =
    (typeof TransactionScalarFieldEnum)[keyof typeof TransactionScalarFieldEnum];

  export const WatchlistScalarFieldEnum: {
    id: 'id';
    userId: 'userId';
    fundId: 'fundId';
    addedAt: 'addedAt';
    createdAt: 'createdAt';
  };

  export type WatchlistScalarFieldEnum =
    (typeof WatchlistScalarFieldEnum)[keyof typeof WatchlistScalarFieldEnum];

  export const RiskProfileScalarFieldEnum: {
    id: 'id';
    userId: 'userId';
    score: 'score';
    category: 'category';
    answers: 'answers';
    completedAt: 'completedAt';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type RiskProfileScalarFieldEnum =
    (typeof RiskProfileScalarFieldEnum)[keyof typeof RiskProfileScalarFieldEnum];

  export const SortOrder: {
    asc: 'asc';
    desc: 'desc';
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];

  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull;
  };

  export type JsonNullValueInput =
    (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput];

  export const QueryMode: {
    default: 'default';
    insensitive: 'insensitive';
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];

  export const NullsOrder: {
    first: 'first';
    last: 'last';
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];

  export const JsonNullValueFilter: {
    DbNull: typeof DbNull;
    JsonNull: typeof JsonNull;
    AnyNull: typeof AnyNull;
  };

  export type JsonNullValueFilter =
    (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];

  /**
   * Field references
   */

  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'String'
  >;

  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'String[]'
  >;

  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'DateTime'
  >;

  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'DateTime[]'
  >;

  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'UserRole'
  >;

  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'UserRole[]'
  >;

  /**
   * Reference to a field of type 'KycStatus'
   */
  export type EnumKycStatusFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'KycStatus'
  >;

  /**
   * Reference to a field of type 'KycStatus[]'
   */
  export type ListEnumKycStatusFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'KycStatus[]'
  >;

  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Int'
  >;

  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Int[]'
  >;

  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Decimal'
  >;

  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Decimal[]'
  >;

  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Boolean'
  >;

  /**
   * Reference to a field of type 'TransactionType'
   */
  export type EnumTransactionTypeFieldRefInput<$PrismaModel> =
    FieldRefInputType<$PrismaModel, 'TransactionType'>;

  /**
   * Reference to a field of type 'TransactionType[]'
   */
  export type ListEnumTransactionTypeFieldRefInput<$PrismaModel> =
    FieldRefInputType<$PrismaModel, 'TransactionType[]'>;

  /**
   * Reference to a field of type 'TransactionStatus'
   */
  export type EnumTransactionStatusFieldRefInput<$PrismaModel> =
    FieldRefInputType<$PrismaModel, 'TransactionStatus'>;

  /**
   * Reference to a field of type 'TransactionStatus[]'
   */
  export type ListEnumTransactionStatusFieldRefInput<$PrismaModel> =
    FieldRefInputType<$PrismaModel, 'TransactionStatus[]'>;

  /**
   * Reference to a field of type 'RiskCategory'
   */
  export type EnumRiskCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'RiskCategory'
  >;

  /**
   * Reference to a field of type 'RiskCategory[]'
   */
  export type ListEnumRiskCategoryFieldRefInput<$PrismaModel> =
    FieldRefInputType<$PrismaModel, 'RiskCategory[]'>;

  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Json'
  >;

  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'QueryMode'
  >;

  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Float'
  >;

  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'Float[]'
  >;

  /**
   * Deep Input Types
   */

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[];
    OR?: UserWhereInput[];
    NOT?: UserWhereInput | UserWhereInput[];
    id?: StringFilter<'User'> | string;
    name?: StringNullableFilter<'User'> | string | null;
    email?: StringFilter<'User'> | string;
    emailVerified?: DateTimeNullableFilter<'User'> | Date | string | null;
    password?: StringNullableFilter<'User'> | string | null;
    image?: StringNullableFilter<'User'> | string | null;
    role?: EnumUserRoleFilter<'User'> | $Enums.UserRole;
    kycStatus?: EnumKycStatusFilter<'User'> | $Enums.KycStatus;
    createdAt?: DateTimeFilter<'User'> | Date | string;
    updatedAt?: DateTimeFilter<'User'> | Date | string;
    riskProfile?: XOR<
      RiskProfileNullableScalarRelationFilter,
      RiskProfileWhereInput
    > | null;
    accounts?: AccountListRelationFilter;
    sessions?: SessionListRelationFilter;
    portfolios?: PortfolioListRelationFilter;
    transactions?: TransactionListRelationFilter;
    watchlist?: WatchlistListRelationFilter;
  };

  export type UserOrderByWithRelationInput = {
    id?: SortOrder;
    name?: SortOrderInput | SortOrder;
    email?: SortOrder;
    emailVerified?: SortOrderInput | SortOrder;
    password?: SortOrderInput | SortOrder;
    image?: SortOrderInput | SortOrder;
    role?: SortOrder;
    kycStatus?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    riskProfile?: RiskProfileOrderByWithRelationInput;
    accounts?: AccountOrderByRelationAggregateInput;
    sessions?: SessionOrderByRelationAggregateInput;
    portfolios?: PortfolioOrderByRelationAggregateInput;
    transactions?: TransactionOrderByRelationAggregateInput;
    watchlist?: WatchlistOrderByRelationAggregateInput;
  };

  export type UserWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      email?: string;
      AND?: UserWhereInput | UserWhereInput[];
      OR?: UserWhereInput[];
      NOT?: UserWhereInput | UserWhereInput[];
      name?: StringNullableFilter<'User'> | string | null;
      emailVerified?: DateTimeNullableFilter<'User'> | Date | string | null;
      password?: StringNullableFilter<'User'> | string | null;
      image?: StringNullableFilter<'User'> | string | null;
      role?: EnumUserRoleFilter<'User'> | $Enums.UserRole;
      kycStatus?: EnumKycStatusFilter<'User'> | $Enums.KycStatus;
      createdAt?: DateTimeFilter<'User'> | Date | string;
      updatedAt?: DateTimeFilter<'User'> | Date | string;
      riskProfile?: XOR<
        RiskProfileNullableScalarRelationFilter,
        RiskProfileWhereInput
      > | null;
      accounts?: AccountListRelationFilter;
      sessions?: SessionListRelationFilter;
      portfolios?: PortfolioListRelationFilter;
      transactions?: TransactionListRelationFilter;
      watchlist?: WatchlistListRelationFilter;
    },
    'id' | 'email'
  >;

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder;
    name?: SortOrderInput | SortOrder;
    email?: SortOrder;
    emailVerified?: SortOrderInput | SortOrder;
    password?: SortOrderInput | SortOrder;
    image?: SortOrderInput | SortOrder;
    role?: SortOrder;
    kycStatus?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: UserCountOrderByAggregateInput;
    _max?: UserMaxOrderByAggregateInput;
    _min?: UserMinOrderByAggregateInput;
  };

  export type UserScalarWhereWithAggregatesInput = {
    AND?:
      | UserScalarWhereWithAggregatesInput
      | UserScalarWhereWithAggregatesInput[];
    OR?: UserScalarWhereWithAggregatesInput[];
    NOT?:
      | UserScalarWhereWithAggregatesInput
      | UserScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'User'> | string;
    name?: StringNullableWithAggregatesFilter<'User'> | string | null;
    email?: StringWithAggregatesFilter<'User'> | string;
    emailVerified?:
      | DateTimeNullableWithAggregatesFilter<'User'>
      | Date
      | string
      | null;
    password?: StringNullableWithAggregatesFilter<'User'> | string | null;
    image?: StringNullableWithAggregatesFilter<'User'> | string | null;
    role?: EnumUserRoleWithAggregatesFilter<'User'> | $Enums.UserRole;
    kycStatus?: EnumKycStatusWithAggregatesFilter<'User'> | $Enums.KycStatus;
    createdAt?: DateTimeWithAggregatesFilter<'User'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'User'> | Date | string;
  };

  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[];
    OR?: AccountWhereInput[];
    NOT?: AccountWhereInput | AccountWhereInput[];
    id?: StringFilter<'Account'> | string;
    userId?: StringFilter<'Account'> | string;
    type?: StringFilter<'Account'> | string;
    provider?: StringFilter<'Account'> | string;
    providerAccountId?: StringFilter<'Account'> | string;
    refresh_token?: StringNullableFilter<'Account'> | string | null;
    access_token?: StringNullableFilter<'Account'> | string | null;
    expires_at?: IntNullableFilter<'Account'> | number | null;
    token_type?: StringNullableFilter<'Account'> | string | null;
    scope?: StringNullableFilter<'Account'> | string | null;
    id_token?: StringNullableFilter<'Account'> | string | null;
    session_state?: StringNullableFilter<'Account'> | string | null;
    user?: XOR<UserScalarRelationFilter, UserWhereInput>;
  };

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder;
    userId?: SortOrder;
    type?: SortOrder;
    provider?: SortOrder;
    providerAccountId?: SortOrder;
    refresh_token?: SortOrderInput | SortOrder;
    access_token?: SortOrderInput | SortOrder;
    expires_at?: SortOrderInput | SortOrder;
    token_type?: SortOrderInput | SortOrder;
    scope?: SortOrderInput | SortOrder;
    id_token?: SortOrderInput | SortOrder;
    session_state?: SortOrderInput | SortOrder;
    user?: UserOrderByWithRelationInput;
  };

  export type AccountWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      provider_providerAccountId?: AccountProviderProviderAccountIdCompoundUniqueInput;
      AND?: AccountWhereInput | AccountWhereInput[];
      OR?: AccountWhereInput[];
      NOT?: AccountWhereInput | AccountWhereInput[];
      userId?: StringFilter<'Account'> | string;
      type?: StringFilter<'Account'> | string;
      provider?: StringFilter<'Account'> | string;
      providerAccountId?: StringFilter<'Account'> | string;
      refresh_token?: StringNullableFilter<'Account'> | string | null;
      access_token?: StringNullableFilter<'Account'> | string | null;
      expires_at?: IntNullableFilter<'Account'> | number | null;
      token_type?: StringNullableFilter<'Account'> | string | null;
      scope?: StringNullableFilter<'Account'> | string | null;
      id_token?: StringNullableFilter<'Account'> | string | null;
      session_state?: StringNullableFilter<'Account'> | string | null;
      user?: XOR<UserScalarRelationFilter, UserWhereInput>;
    },
    'id' | 'provider_providerAccountId'
  >;

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder;
    userId?: SortOrder;
    type?: SortOrder;
    provider?: SortOrder;
    providerAccountId?: SortOrder;
    refresh_token?: SortOrderInput | SortOrder;
    access_token?: SortOrderInput | SortOrder;
    expires_at?: SortOrderInput | SortOrder;
    token_type?: SortOrderInput | SortOrder;
    scope?: SortOrderInput | SortOrder;
    id_token?: SortOrderInput | SortOrder;
    session_state?: SortOrderInput | SortOrder;
    _count?: AccountCountOrderByAggregateInput;
    _avg?: AccountAvgOrderByAggregateInput;
    _max?: AccountMaxOrderByAggregateInput;
    _min?: AccountMinOrderByAggregateInput;
    _sum?: AccountSumOrderByAggregateInput;
  };

  export type AccountScalarWhereWithAggregatesInput = {
    AND?:
      | AccountScalarWhereWithAggregatesInput
      | AccountScalarWhereWithAggregatesInput[];
    OR?: AccountScalarWhereWithAggregatesInput[];
    NOT?:
      | AccountScalarWhereWithAggregatesInput
      | AccountScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'Account'> | string;
    userId?: StringWithAggregatesFilter<'Account'> | string;
    type?: StringWithAggregatesFilter<'Account'> | string;
    provider?: StringWithAggregatesFilter<'Account'> | string;
    providerAccountId?: StringWithAggregatesFilter<'Account'> | string;
    refresh_token?:
      | StringNullableWithAggregatesFilter<'Account'>
      | string
      | null;
    access_token?:
      | StringNullableWithAggregatesFilter<'Account'>
      | string
      | null;
    expires_at?: IntNullableWithAggregatesFilter<'Account'> | number | null;
    token_type?: StringNullableWithAggregatesFilter<'Account'> | string | null;
    scope?: StringNullableWithAggregatesFilter<'Account'> | string | null;
    id_token?: StringNullableWithAggregatesFilter<'Account'> | string | null;
    session_state?:
      | StringNullableWithAggregatesFilter<'Account'>
      | string
      | null;
  };

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[];
    OR?: SessionWhereInput[];
    NOT?: SessionWhereInput | SessionWhereInput[];
    id?: StringFilter<'Session'> | string;
    sessionToken?: StringFilter<'Session'> | string;
    userId?: StringFilter<'Session'> | string;
    expires?: DateTimeFilter<'Session'> | Date | string;
    user?: XOR<UserScalarRelationFilter, UserWhereInput>;
  };

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder;
    sessionToken?: SortOrder;
    userId?: SortOrder;
    expires?: SortOrder;
    user?: UserOrderByWithRelationInput;
  };

  export type SessionWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      sessionToken?: string;
      AND?: SessionWhereInput | SessionWhereInput[];
      OR?: SessionWhereInput[];
      NOT?: SessionWhereInput | SessionWhereInput[];
      userId?: StringFilter<'Session'> | string;
      expires?: DateTimeFilter<'Session'> | Date | string;
      user?: XOR<UserScalarRelationFilter, UserWhereInput>;
    },
    'id' | 'sessionToken'
  >;

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder;
    sessionToken?: SortOrder;
    userId?: SortOrder;
    expires?: SortOrder;
    _count?: SessionCountOrderByAggregateInput;
    _max?: SessionMaxOrderByAggregateInput;
    _min?: SessionMinOrderByAggregateInput;
  };

  export type SessionScalarWhereWithAggregatesInput = {
    AND?:
      | SessionScalarWhereWithAggregatesInput
      | SessionScalarWhereWithAggregatesInput[];
    OR?: SessionScalarWhereWithAggregatesInput[];
    NOT?:
      | SessionScalarWhereWithAggregatesInput
      | SessionScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'Session'> | string;
    sessionToken?: StringWithAggregatesFilter<'Session'> | string;
    userId?: StringWithAggregatesFilter<'Session'> | string;
    expires?: DateTimeWithAggregatesFilter<'Session'> | Date | string;
  };

  export type VerificationTokenWhereInput = {
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[];
    OR?: VerificationTokenWhereInput[];
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[];
    identifier?: StringFilter<'VerificationToken'> | string;
    token?: StringFilter<'VerificationToken'> | string;
    expires?: DateTimeFilter<'VerificationToken'> | Date | string;
  };

  export type VerificationTokenOrderByWithRelationInput = {
    identifier?: SortOrder;
    token?: SortOrder;
    expires?: SortOrder;
  };

  export type VerificationTokenWhereUniqueInput = Prisma.AtLeast<
    {
      token?: string;
      identifier_token?: VerificationTokenIdentifierTokenCompoundUniqueInput;
      AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[];
      OR?: VerificationTokenWhereInput[];
      NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[];
      identifier?: StringFilter<'VerificationToken'> | string;
      expires?: DateTimeFilter<'VerificationToken'> | Date | string;
    },
    'token' | 'identifier_token'
  >;

  export type VerificationTokenOrderByWithAggregationInput = {
    identifier?: SortOrder;
    token?: SortOrder;
    expires?: SortOrder;
    _count?: VerificationTokenCountOrderByAggregateInput;
    _max?: VerificationTokenMaxOrderByAggregateInput;
    _min?: VerificationTokenMinOrderByAggregateInput;
  };

  export type VerificationTokenScalarWhereWithAggregatesInput = {
    AND?:
      | VerificationTokenScalarWhereWithAggregatesInput
      | VerificationTokenScalarWhereWithAggregatesInput[];
    OR?: VerificationTokenScalarWhereWithAggregatesInput[];
    NOT?:
      | VerificationTokenScalarWhereWithAggregatesInput
      | VerificationTokenScalarWhereWithAggregatesInput[];
    identifier?: StringWithAggregatesFilter<'VerificationToken'> | string;
    token?: StringWithAggregatesFilter<'VerificationToken'> | string;
    expires?: DateTimeWithAggregatesFilter<'VerificationToken'> | Date | string;
  };

  export type FundWhereInput = {
    AND?: FundWhereInput | FundWhereInput[];
    OR?: FundWhereInput[];
    NOT?: FundWhereInput | FundWhereInput[];
    id?: StringFilter<'Fund'> | string;
    schemeCode?: StringFilter<'Fund'> | string;
    schemeName?: StringFilter<'Fund'> | string;
    amcName?: StringFilter<'Fund'> | string;
    category?: StringFilter<'Fund'> | string;
    subCategory?: StringNullableFilter<'Fund'> | string | null;
    nav?: DecimalFilter<'Fund'> | Decimal | DecimalJsLike | number | string;
    aum?:
      | DecimalNullableFilter<'Fund'>
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    expenseRatio?:
      | DecimalNullableFilter<'Fund'>
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    sharpeRatio?:
      | DecimalNullableFilter<'Fund'>
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    alpha?:
      | DecimalNullableFilter<'Fund'>
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    beta?:
      | DecimalNullableFilter<'Fund'>
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    stdDeviation?:
      | DecimalNullableFilter<'Fund'>
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    returns1y?:
      | DecimalNullableFilter<'Fund'>
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    returns3y?:
      | DecimalNullableFilter<'Fund'>
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    returns5y?:
      | DecimalNullableFilter<'Fund'>
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    returns10y?:
      | DecimalNullableFilter<'Fund'>
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    managerName?: StringNullableFilter<'Fund'> | string | null;
    launchDate?: DateTimeNullableFilter<'Fund'> | Date | string | null;
    benchmarkIndex?: StringNullableFilter<'Fund'> | string | null;
    isActive?: BoolFilter<'Fund'> | boolean;
    createdAt?: DateTimeFilter<'Fund'> | Date | string;
    updatedAt?: DateTimeFilter<'Fund'> | Date | string;
    navHistory?: NavHistoryListRelationFilter;
    holdings?: HoldingListRelationFilter;
    transactions?: TransactionListRelationFilter;
    watchlist?: WatchlistListRelationFilter;
  };

  export type FundOrderByWithRelationInput = {
    id?: SortOrder;
    schemeCode?: SortOrder;
    schemeName?: SortOrder;
    amcName?: SortOrder;
    category?: SortOrder;
    subCategory?: SortOrderInput | SortOrder;
    nav?: SortOrder;
    aum?: SortOrderInput | SortOrder;
    expenseRatio?: SortOrderInput | SortOrder;
    sharpeRatio?: SortOrderInput | SortOrder;
    alpha?: SortOrderInput | SortOrder;
    beta?: SortOrderInput | SortOrder;
    stdDeviation?: SortOrderInput | SortOrder;
    returns1y?: SortOrderInput | SortOrder;
    returns3y?: SortOrderInput | SortOrder;
    returns5y?: SortOrderInput | SortOrder;
    returns10y?: SortOrderInput | SortOrder;
    managerName?: SortOrderInput | SortOrder;
    launchDate?: SortOrderInput | SortOrder;
    benchmarkIndex?: SortOrderInput | SortOrder;
    isActive?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    navHistory?: NavHistoryOrderByRelationAggregateInput;
    holdings?: HoldingOrderByRelationAggregateInput;
    transactions?: TransactionOrderByRelationAggregateInput;
    watchlist?: WatchlistOrderByRelationAggregateInput;
  };

  export type FundWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      schemeCode?: string;
      AND?: FundWhereInput | FundWhereInput[];
      OR?: FundWhereInput[];
      NOT?: FundWhereInput | FundWhereInput[];
      schemeName?: StringFilter<'Fund'> | string;
      amcName?: StringFilter<'Fund'> | string;
      category?: StringFilter<'Fund'> | string;
      subCategory?: StringNullableFilter<'Fund'> | string | null;
      nav?: DecimalFilter<'Fund'> | Decimal | DecimalJsLike | number | string;
      aum?:
        | DecimalNullableFilter<'Fund'>
        | Decimal
        | DecimalJsLike
        | number
        | string
        | null;
      expenseRatio?:
        | DecimalNullableFilter<'Fund'>
        | Decimal
        | DecimalJsLike
        | number
        | string
        | null;
      sharpeRatio?:
        | DecimalNullableFilter<'Fund'>
        | Decimal
        | DecimalJsLike
        | number
        | string
        | null;
      alpha?:
        | DecimalNullableFilter<'Fund'>
        | Decimal
        | DecimalJsLike
        | number
        | string
        | null;
      beta?:
        | DecimalNullableFilter<'Fund'>
        | Decimal
        | DecimalJsLike
        | number
        | string
        | null;
      stdDeviation?:
        | DecimalNullableFilter<'Fund'>
        | Decimal
        | DecimalJsLike
        | number
        | string
        | null;
      returns1y?:
        | DecimalNullableFilter<'Fund'>
        | Decimal
        | DecimalJsLike
        | number
        | string
        | null;
      returns3y?:
        | DecimalNullableFilter<'Fund'>
        | Decimal
        | DecimalJsLike
        | number
        | string
        | null;
      returns5y?:
        | DecimalNullableFilter<'Fund'>
        | Decimal
        | DecimalJsLike
        | number
        | string
        | null;
      returns10y?:
        | DecimalNullableFilter<'Fund'>
        | Decimal
        | DecimalJsLike
        | number
        | string
        | null;
      managerName?: StringNullableFilter<'Fund'> | string | null;
      launchDate?: DateTimeNullableFilter<'Fund'> | Date | string | null;
      benchmarkIndex?: StringNullableFilter<'Fund'> | string | null;
      isActive?: BoolFilter<'Fund'> | boolean;
      createdAt?: DateTimeFilter<'Fund'> | Date | string;
      updatedAt?: DateTimeFilter<'Fund'> | Date | string;
      navHistory?: NavHistoryListRelationFilter;
      holdings?: HoldingListRelationFilter;
      transactions?: TransactionListRelationFilter;
      watchlist?: WatchlistListRelationFilter;
    },
    'id' | 'schemeCode'
  >;

  export type FundOrderByWithAggregationInput = {
    id?: SortOrder;
    schemeCode?: SortOrder;
    schemeName?: SortOrder;
    amcName?: SortOrder;
    category?: SortOrder;
    subCategory?: SortOrderInput | SortOrder;
    nav?: SortOrder;
    aum?: SortOrderInput | SortOrder;
    expenseRatio?: SortOrderInput | SortOrder;
    sharpeRatio?: SortOrderInput | SortOrder;
    alpha?: SortOrderInput | SortOrder;
    beta?: SortOrderInput | SortOrder;
    stdDeviation?: SortOrderInput | SortOrder;
    returns1y?: SortOrderInput | SortOrder;
    returns3y?: SortOrderInput | SortOrder;
    returns5y?: SortOrderInput | SortOrder;
    returns10y?: SortOrderInput | SortOrder;
    managerName?: SortOrderInput | SortOrder;
    launchDate?: SortOrderInput | SortOrder;
    benchmarkIndex?: SortOrderInput | SortOrder;
    isActive?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: FundCountOrderByAggregateInput;
    _avg?: FundAvgOrderByAggregateInput;
    _max?: FundMaxOrderByAggregateInput;
    _min?: FundMinOrderByAggregateInput;
    _sum?: FundSumOrderByAggregateInput;
  };

  export type FundScalarWhereWithAggregatesInput = {
    AND?:
      | FundScalarWhereWithAggregatesInput
      | FundScalarWhereWithAggregatesInput[];
    OR?: FundScalarWhereWithAggregatesInput[];
    NOT?:
      | FundScalarWhereWithAggregatesInput
      | FundScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'Fund'> | string;
    schemeCode?: StringWithAggregatesFilter<'Fund'> | string;
    schemeName?: StringWithAggregatesFilter<'Fund'> | string;
    amcName?: StringWithAggregatesFilter<'Fund'> | string;
    category?: StringWithAggregatesFilter<'Fund'> | string;
    subCategory?: StringNullableWithAggregatesFilter<'Fund'> | string | null;
    nav?:
      | DecimalWithAggregatesFilter<'Fund'>
      | Decimal
      | DecimalJsLike
      | number
      | string;
    aum?:
      | DecimalNullableWithAggregatesFilter<'Fund'>
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    expenseRatio?:
      | DecimalNullableWithAggregatesFilter<'Fund'>
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    sharpeRatio?:
      | DecimalNullableWithAggregatesFilter<'Fund'>
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    alpha?:
      | DecimalNullableWithAggregatesFilter<'Fund'>
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    beta?:
      | DecimalNullableWithAggregatesFilter<'Fund'>
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    stdDeviation?:
      | DecimalNullableWithAggregatesFilter<'Fund'>
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    returns1y?:
      | DecimalNullableWithAggregatesFilter<'Fund'>
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    returns3y?:
      | DecimalNullableWithAggregatesFilter<'Fund'>
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    returns5y?:
      | DecimalNullableWithAggregatesFilter<'Fund'>
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    returns10y?:
      | DecimalNullableWithAggregatesFilter<'Fund'>
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    managerName?: StringNullableWithAggregatesFilter<'Fund'> | string | null;
    launchDate?:
      | DateTimeNullableWithAggregatesFilter<'Fund'>
      | Date
      | string
      | null;
    benchmarkIndex?: StringNullableWithAggregatesFilter<'Fund'> | string | null;
    isActive?: BoolWithAggregatesFilter<'Fund'> | boolean;
    createdAt?: DateTimeWithAggregatesFilter<'Fund'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'Fund'> | Date | string;
  };

  export type NavHistoryWhereInput = {
    AND?: NavHistoryWhereInput | NavHistoryWhereInput[];
    OR?: NavHistoryWhereInput[];
    NOT?: NavHistoryWhereInput | NavHistoryWhereInput[];
    id?: StringFilter<'NavHistory'> | string;
    fundId?: StringFilter<'NavHistory'> | string;
    nav?:
      | DecimalFilter<'NavHistory'>
      | Decimal
      | DecimalJsLike
      | number
      | string;
    date?: DateTimeFilter<'NavHistory'> | Date | string;
    createdAt?: DateTimeFilter<'NavHistory'> | Date | string;
    fund?: XOR<FundScalarRelationFilter, FundWhereInput>;
  };

  export type NavHistoryOrderByWithRelationInput = {
    id?: SortOrder;
    fundId?: SortOrder;
    nav?: SortOrder;
    date?: SortOrder;
    createdAt?: SortOrder;
    fund?: FundOrderByWithRelationInput;
  };

  export type NavHistoryWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      fundId_date?: NavHistoryFundIdDateCompoundUniqueInput;
      AND?: NavHistoryWhereInput | NavHistoryWhereInput[];
      OR?: NavHistoryWhereInput[];
      NOT?: NavHistoryWhereInput | NavHistoryWhereInput[];
      fundId?: StringFilter<'NavHistory'> | string;
      nav?:
        | DecimalFilter<'NavHistory'>
        | Decimal
        | DecimalJsLike
        | number
        | string;
      date?: DateTimeFilter<'NavHistory'> | Date | string;
      createdAt?: DateTimeFilter<'NavHistory'> | Date | string;
      fund?: XOR<FundScalarRelationFilter, FundWhereInput>;
    },
    'id' | 'fundId_date'
  >;

  export type NavHistoryOrderByWithAggregationInput = {
    id?: SortOrder;
    fundId?: SortOrder;
    nav?: SortOrder;
    date?: SortOrder;
    createdAt?: SortOrder;
    _count?: NavHistoryCountOrderByAggregateInput;
    _avg?: NavHistoryAvgOrderByAggregateInput;
    _max?: NavHistoryMaxOrderByAggregateInput;
    _min?: NavHistoryMinOrderByAggregateInput;
    _sum?: NavHistorySumOrderByAggregateInput;
  };

  export type NavHistoryScalarWhereWithAggregatesInput = {
    AND?:
      | NavHistoryScalarWhereWithAggregatesInput
      | NavHistoryScalarWhereWithAggregatesInput[];
    OR?: NavHistoryScalarWhereWithAggregatesInput[];
    NOT?:
      | NavHistoryScalarWhereWithAggregatesInput
      | NavHistoryScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'NavHistory'> | string;
    fundId?: StringWithAggregatesFilter<'NavHistory'> | string;
    nav?:
      | DecimalWithAggregatesFilter<'NavHistory'>
      | Decimal
      | DecimalJsLike
      | number
      | string;
    date?: DateTimeWithAggregatesFilter<'NavHistory'> | Date | string;
    createdAt?: DateTimeWithAggregatesFilter<'NavHistory'> | Date | string;
  };

  export type PortfolioWhereInput = {
    AND?: PortfolioWhereInput | PortfolioWhereInput[];
    OR?: PortfolioWhereInput[];
    NOT?: PortfolioWhereInput | PortfolioWhereInput[];
    id?: StringFilter<'Portfolio'> | string;
    userId?: StringFilter<'Portfolio'> | string;
    name?: StringFilter<'Portfolio'> | string;
    createdAt?: DateTimeFilter<'Portfolio'> | Date | string;
    updatedAt?: DateTimeFilter<'Portfolio'> | Date | string;
    user?: XOR<UserScalarRelationFilter, UserWhereInput>;
    holdings?: HoldingListRelationFilter;
  };

  export type PortfolioOrderByWithRelationInput = {
    id?: SortOrder;
    userId?: SortOrder;
    name?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    user?: UserOrderByWithRelationInput;
    holdings?: HoldingOrderByRelationAggregateInput;
  };

  export type PortfolioWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: PortfolioWhereInput | PortfolioWhereInput[];
      OR?: PortfolioWhereInput[];
      NOT?: PortfolioWhereInput | PortfolioWhereInput[];
      userId?: StringFilter<'Portfolio'> | string;
      name?: StringFilter<'Portfolio'> | string;
      createdAt?: DateTimeFilter<'Portfolio'> | Date | string;
      updatedAt?: DateTimeFilter<'Portfolio'> | Date | string;
      user?: XOR<UserScalarRelationFilter, UserWhereInput>;
      holdings?: HoldingListRelationFilter;
    },
    'id'
  >;

  export type PortfolioOrderByWithAggregationInput = {
    id?: SortOrder;
    userId?: SortOrder;
    name?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: PortfolioCountOrderByAggregateInput;
    _max?: PortfolioMaxOrderByAggregateInput;
    _min?: PortfolioMinOrderByAggregateInput;
  };

  export type PortfolioScalarWhereWithAggregatesInput = {
    AND?:
      | PortfolioScalarWhereWithAggregatesInput
      | PortfolioScalarWhereWithAggregatesInput[];
    OR?: PortfolioScalarWhereWithAggregatesInput[];
    NOT?:
      | PortfolioScalarWhereWithAggregatesInput
      | PortfolioScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'Portfolio'> | string;
    userId?: StringWithAggregatesFilter<'Portfolio'> | string;
    name?: StringWithAggregatesFilter<'Portfolio'> | string;
    createdAt?: DateTimeWithAggregatesFilter<'Portfolio'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'Portfolio'> | Date | string;
  };

  export type HoldingWhereInput = {
    AND?: HoldingWhereInput | HoldingWhereInput[];
    OR?: HoldingWhereInput[];
    NOT?: HoldingWhereInput | HoldingWhereInput[];
    id?: StringFilter<'Holding'> | string;
    portfolioId?: StringFilter<'Holding'> | string;
    fundId?: StringFilter<'Holding'> | string;
    units?:
      | DecimalFilter<'Holding'>
      | Decimal
      | DecimalJsLike
      | number
      | string;
    avgNav?:
      | DecimalFilter<'Holding'>
      | Decimal
      | DecimalJsLike
      | number
      | string;
    investedAmount?:
      | DecimalFilter<'Holding'>
      | Decimal
      | DecimalJsLike
      | number
      | string;
    purchaseDate?: DateTimeNullableFilter<'Holding'> | Date | string | null;
    createdAt?: DateTimeFilter<'Holding'> | Date | string;
    updatedAt?: DateTimeFilter<'Holding'> | Date | string;
    portfolio?: XOR<PortfolioScalarRelationFilter, PortfolioWhereInput>;
    fund?: XOR<FundScalarRelationFilter, FundWhereInput>;
  };

  export type HoldingOrderByWithRelationInput = {
    id?: SortOrder;
    portfolioId?: SortOrder;
    fundId?: SortOrder;
    units?: SortOrder;
    avgNav?: SortOrder;
    investedAmount?: SortOrder;
    purchaseDate?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    portfolio?: PortfolioOrderByWithRelationInput;
    fund?: FundOrderByWithRelationInput;
  };

  export type HoldingWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: HoldingWhereInput | HoldingWhereInput[];
      OR?: HoldingWhereInput[];
      NOT?: HoldingWhereInput | HoldingWhereInput[];
      portfolioId?: StringFilter<'Holding'> | string;
      fundId?: StringFilter<'Holding'> | string;
      units?:
        | DecimalFilter<'Holding'>
        | Decimal
        | DecimalJsLike
        | number
        | string;
      avgNav?:
        | DecimalFilter<'Holding'>
        | Decimal
        | DecimalJsLike
        | number
        | string;
      investedAmount?:
        | DecimalFilter<'Holding'>
        | Decimal
        | DecimalJsLike
        | number
        | string;
      purchaseDate?: DateTimeNullableFilter<'Holding'> | Date | string | null;
      createdAt?: DateTimeFilter<'Holding'> | Date | string;
      updatedAt?: DateTimeFilter<'Holding'> | Date | string;
      portfolio?: XOR<PortfolioScalarRelationFilter, PortfolioWhereInput>;
      fund?: XOR<FundScalarRelationFilter, FundWhereInput>;
    },
    'id'
  >;

  export type HoldingOrderByWithAggregationInput = {
    id?: SortOrder;
    portfolioId?: SortOrder;
    fundId?: SortOrder;
    units?: SortOrder;
    avgNav?: SortOrder;
    investedAmount?: SortOrder;
    purchaseDate?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: HoldingCountOrderByAggregateInput;
    _avg?: HoldingAvgOrderByAggregateInput;
    _max?: HoldingMaxOrderByAggregateInput;
    _min?: HoldingMinOrderByAggregateInput;
    _sum?: HoldingSumOrderByAggregateInput;
  };

  export type HoldingScalarWhereWithAggregatesInput = {
    AND?:
      | HoldingScalarWhereWithAggregatesInput
      | HoldingScalarWhereWithAggregatesInput[];
    OR?: HoldingScalarWhereWithAggregatesInput[];
    NOT?:
      | HoldingScalarWhereWithAggregatesInput
      | HoldingScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'Holding'> | string;
    portfolioId?: StringWithAggregatesFilter<'Holding'> | string;
    fundId?: StringWithAggregatesFilter<'Holding'> | string;
    units?:
      | DecimalWithAggregatesFilter<'Holding'>
      | Decimal
      | DecimalJsLike
      | number
      | string;
    avgNav?:
      | DecimalWithAggregatesFilter<'Holding'>
      | Decimal
      | DecimalJsLike
      | number
      | string;
    investedAmount?:
      | DecimalWithAggregatesFilter<'Holding'>
      | Decimal
      | DecimalJsLike
      | number
      | string;
    purchaseDate?:
      | DateTimeNullableWithAggregatesFilter<'Holding'>
      | Date
      | string
      | null;
    createdAt?: DateTimeWithAggregatesFilter<'Holding'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'Holding'> | Date | string;
  };

  export type TransactionWhereInput = {
    AND?: TransactionWhereInput | TransactionWhereInput[];
    OR?: TransactionWhereInput[];
    NOT?: TransactionWhereInput | TransactionWhereInput[];
    id?: StringFilter<'Transaction'> | string;
    userId?: StringFilter<'Transaction'> | string;
    fundId?: StringFilter<'Transaction'> | string;
    type?: EnumTransactionTypeFilter<'Transaction'> | $Enums.TransactionType;
    amount?:
      | DecimalFilter<'Transaction'>
      | Decimal
      | DecimalJsLike
      | number
      | string;
    units?:
      | DecimalFilter<'Transaction'>
      | Decimal
      | DecimalJsLike
      | number
      | string;
    nav?:
      | DecimalFilter<'Transaction'>
      | Decimal
      | DecimalJsLike
      | number
      | string;
    date?: DateTimeFilter<'Transaction'> | Date | string;
    status?:
      | EnumTransactionStatusFilter<'Transaction'>
      | $Enums.TransactionStatus;
    createdAt?: DateTimeFilter<'Transaction'> | Date | string;
    user?: XOR<UserScalarRelationFilter, UserWhereInput>;
    fund?: XOR<FundScalarRelationFilter, FundWhereInput>;
  };

  export type TransactionOrderByWithRelationInput = {
    id?: SortOrder;
    userId?: SortOrder;
    fundId?: SortOrder;
    type?: SortOrder;
    amount?: SortOrder;
    units?: SortOrder;
    nav?: SortOrder;
    date?: SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    user?: UserOrderByWithRelationInput;
    fund?: FundOrderByWithRelationInput;
  };

  export type TransactionWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: TransactionWhereInput | TransactionWhereInput[];
      OR?: TransactionWhereInput[];
      NOT?: TransactionWhereInput | TransactionWhereInput[];
      userId?: StringFilter<'Transaction'> | string;
      fundId?: StringFilter<'Transaction'> | string;
      type?: EnumTransactionTypeFilter<'Transaction'> | $Enums.TransactionType;
      amount?:
        | DecimalFilter<'Transaction'>
        | Decimal
        | DecimalJsLike
        | number
        | string;
      units?:
        | DecimalFilter<'Transaction'>
        | Decimal
        | DecimalJsLike
        | number
        | string;
      nav?:
        | DecimalFilter<'Transaction'>
        | Decimal
        | DecimalJsLike
        | number
        | string;
      date?: DateTimeFilter<'Transaction'> | Date | string;
      status?:
        | EnumTransactionStatusFilter<'Transaction'>
        | $Enums.TransactionStatus;
      createdAt?: DateTimeFilter<'Transaction'> | Date | string;
      user?: XOR<UserScalarRelationFilter, UserWhereInput>;
      fund?: XOR<FundScalarRelationFilter, FundWhereInput>;
    },
    'id'
  >;

  export type TransactionOrderByWithAggregationInput = {
    id?: SortOrder;
    userId?: SortOrder;
    fundId?: SortOrder;
    type?: SortOrder;
    amount?: SortOrder;
    units?: SortOrder;
    nav?: SortOrder;
    date?: SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
    _count?: TransactionCountOrderByAggregateInput;
    _avg?: TransactionAvgOrderByAggregateInput;
    _max?: TransactionMaxOrderByAggregateInput;
    _min?: TransactionMinOrderByAggregateInput;
    _sum?: TransactionSumOrderByAggregateInput;
  };

  export type TransactionScalarWhereWithAggregatesInput = {
    AND?:
      | TransactionScalarWhereWithAggregatesInput
      | TransactionScalarWhereWithAggregatesInput[];
    OR?: TransactionScalarWhereWithAggregatesInput[];
    NOT?:
      | TransactionScalarWhereWithAggregatesInput
      | TransactionScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'Transaction'> | string;
    userId?: StringWithAggregatesFilter<'Transaction'> | string;
    fundId?: StringWithAggregatesFilter<'Transaction'> | string;
    type?:
      | EnumTransactionTypeWithAggregatesFilter<'Transaction'>
      | $Enums.TransactionType;
    amount?:
      | DecimalWithAggregatesFilter<'Transaction'>
      | Decimal
      | DecimalJsLike
      | number
      | string;
    units?:
      | DecimalWithAggregatesFilter<'Transaction'>
      | Decimal
      | DecimalJsLike
      | number
      | string;
    nav?:
      | DecimalWithAggregatesFilter<'Transaction'>
      | Decimal
      | DecimalJsLike
      | number
      | string;
    date?: DateTimeWithAggregatesFilter<'Transaction'> | Date | string;
    status?:
      | EnumTransactionStatusWithAggregatesFilter<'Transaction'>
      | $Enums.TransactionStatus;
    createdAt?: DateTimeWithAggregatesFilter<'Transaction'> | Date | string;
  };

  export type WatchlistWhereInput = {
    AND?: WatchlistWhereInput | WatchlistWhereInput[];
    OR?: WatchlistWhereInput[];
    NOT?: WatchlistWhereInput | WatchlistWhereInput[];
    id?: StringFilter<'Watchlist'> | string;
    userId?: StringFilter<'Watchlist'> | string;
    fundId?: StringFilter<'Watchlist'> | string;
    addedAt?: DateTimeFilter<'Watchlist'> | Date | string;
    createdAt?: DateTimeFilter<'Watchlist'> | Date | string;
    user?: XOR<UserScalarRelationFilter, UserWhereInput>;
    fund?: XOR<FundScalarRelationFilter, FundWhereInput>;
  };

  export type WatchlistOrderByWithRelationInput = {
    id?: SortOrder;
    userId?: SortOrder;
    fundId?: SortOrder;
    addedAt?: SortOrder;
    createdAt?: SortOrder;
    user?: UserOrderByWithRelationInput;
    fund?: FundOrderByWithRelationInput;
  };

  export type WatchlistWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      userId_fundId?: WatchlistUserIdFundIdCompoundUniqueInput;
      AND?: WatchlistWhereInput | WatchlistWhereInput[];
      OR?: WatchlistWhereInput[];
      NOT?: WatchlistWhereInput | WatchlistWhereInput[];
      userId?: StringFilter<'Watchlist'> | string;
      fundId?: StringFilter<'Watchlist'> | string;
      addedAt?: DateTimeFilter<'Watchlist'> | Date | string;
      createdAt?: DateTimeFilter<'Watchlist'> | Date | string;
      user?: XOR<UserScalarRelationFilter, UserWhereInput>;
      fund?: XOR<FundScalarRelationFilter, FundWhereInput>;
    },
    'id' | 'userId_fundId'
  >;

  export type WatchlistOrderByWithAggregationInput = {
    id?: SortOrder;
    userId?: SortOrder;
    fundId?: SortOrder;
    addedAt?: SortOrder;
    createdAt?: SortOrder;
    _count?: WatchlistCountOrderByAggregateInput;
    _max?: WatchlistMaxOrderByAggregateInput;
    _min?: WatchlistMinOrderByAggregateInput;
  };

  export type WatchlistScalarWhereWithAggregatesInput = {
    AND?:
      | WatchlistScalarWhereWithAggregatesInput
      | WatchlistScalarWhereWithAggregatesInput[];
    OR?: WatchlistScalarWhereWithAggregatesInput[];
    NOT?:
      | WatchlistScalarWhereWithAggregatesInput
      | WatchlistScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'Watchlist'> | string;
    userId?: StringWithAggregatesFilter<'Watchlist'> | string;
    fundId?: StringWithAggregatesFilter<'Watchlist'> | string;
    addedAt?: DateTimeWithAggregatesFilter<'Watchlist'> | Date | string;
    createdAt?: DateTimeWithAggregatesFilter<'Watchlist'> | Date | string;
  };

  export type RiskProfileWhereInput = {
    AND?: RiskProfileWhereInput | RiskProfileWhereInput[];
    OR?: RiskProfileWhereInput[];
    NOT?: RiskProfileWhereInput | RiskProfileWhereInput[];
    id?: StringFilter<'RiskProfile'> | string;
    userId?: StringFilter<'RiskProfile'> | string;
    score?: IntFilter<'RiskProfile'> | number;
    category?: EnumRiskCategoryFilter<'RiskProfile'> | $Enums.RiskCategory;
    answers?: JsonFilter<'RiskProfile'>;
    completedAt?: DateTimeFilter<'RiskProfile'> | Date | string;
    createdAt?: DateTimeFilter<'RiskProfile'> | Date | string;
    updatedAt?: DateTimeFilter<'RiskProfile'> | Date | string;
    user?: XOR<UserScalarRelationFilter, UserWhereInput>;
  };

  export type RiskProfileOrderByWithRelationInput = {
    id?: SortOrder;
    userId?: SortOrder;
    score?: SortOrder;
    category?: SortOrder;
    answers?: SortOrder;
    completedAt?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    user?: UserOrderByWithRelationInput;
  };

  export type RiskProfileWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      userId?: string;
      AND?: RiskProfileWhereInput | RiskProfileWhereInput[];
      OR?: RiskProfileWhereInput[];
      NOT?: RiskProfileWhereInput | RiskProfileWhereInput[];
      score?: IntFilter<'RiskProfile'> | number;
      category?: EnumRiskCategoryFilter<'RiskProfile'> | $Enums.RiskCategory;
      answers?: JsonFilter<'RiskProfile'>;
      completedAt?: DateTimeFilter<'RiskProfile'> | Date | string;
      createdAt?: DateTimeFilter<'RiskProfile'> | Date | string;
      updatedAt?: DateTimeFilter<'RiskProfile'> | Date | string;
      user?: XOR<UserScalarRelationFilter, UserWhereInput>;
    },
    'id' | 'userId'
  >;

  export type RiskProfileOrderByWithAggregationInput = {
    id?: SortOrder;
    userId?: SortOrder;
    score?: SortOrder;
    category?: SortOrder;
    answers?: SortOrder;
    completedAt?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: RiskProfileCountOrderByAggregateInput;
    _avg?: RiskProfileAvgOrderByAggregateInput;
    _max?: RiskProfileMaxOrderByAggregateInput;
    _min?: RiskProfileMinOrderByAggregateInput;
    _sum?: RiskProfileSumOrderByAggregateInput;
  };

  export type RiskProfileScalarWhereWithAggregatesInput = {
    AND?:
      | RiskProfileScalarWhereWithAggregatesInput
      | RiskProfileScalarWhereWithAggregatesInput[];
    OR?: RiskProfileScalarWhereWithAggregatesInput[];
    NOT?:
      | RiskProfileScalarWhereWithAggregatesInput
      | RiskProfileScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'RiskProfile'> | string;
    userId?: StringWithAggregatesFilter<'RiskProfile'> | string;
    score?: IntWithAggregatesFilter<'RiskProfile'> | number;
    category?:
      | EnumRiskCategoryWithAggregatesFilter<'RiskProfile'>
      | $Enums.RiskCategory;
    answers?: JsonWithAggregatesFilter<'RiskProfile'>;
    completedAt?: DateTimeWithAggregatesFilter<'RiskProfile'> | Date | string;
    createdAt?: DateTimeWithAggregatesFilter<'RiskProfile'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'RiskProfile'> | Date | string;
  };

  export type UserCreateInput = {
    id?: string;
    name?: string | null;
    email: string;
    emailVerified?: Date | string | null;
    password?: string | null;
    image?: string | null;
    role?: $Enums.UserRole;
    kycStatus?: $Enums.KycStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    riskProfile?: RiskProfileCreateNestedOneWithoutUserInput;
    accounts?: AccountCreateNestedManyWithoutUserInput;
    sessions?: SessionCreateNestedManyWithoutUserInput;
    portfolios?: PortfolioCreateNestedManyWithoutUserInput;
    transactions?: TransactionCreateNestedManyWithoutUserInput;
    watchlist?: WatchlistCreateNestedManyWithoutUserInput;
  };

  export type UserUncheckedCreateInput = {
    id?: string;
    name?: string | null;
    email: string;
    emailVerified?: Date | string | null;
    password?: string | null;
    image?: string | null;
    role?: $Enums.UserRole;
    kycStatus?: $Enums.KycStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    riskProfile?: RiskProfileUncheckedCreateNestedOneWithoutUserInput;
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput;
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput;
    portfolios?: PortfolioUncheckedCreateNestedManyWithoutUserInput;
    transactions?: TransactionUncheckedCreateNestedManyWithoutUserInput;
    watchlist?: WatchlistUncheckedCreateNestedManyWithoutUserInput;
  };

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: StringFieldUpdateOperationsInput | string;
    emailVerified?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    password?: NullableStringFieldUpdateOperationsInput | string | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    kycStatus?: EnumKycStatusFieldUpdateOperationsInput | $Enums.KycStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    riskProfile?: RiskProfileUpdateOneWithoutUserNestedInput;
    accounts?: AccountUpdateManyWithoutUserNestedInput;
    sessions?: SessionUpdateManyWithoutUserNestedInput;
    portfolios?: PortfolioUpdateManyWithoutUserNestedInput;
    transactions?: TransactionUpdateManyWithoutUserNestedInput;
    watchlist?: WatchlistUpdateManyWithoutUserNestedInput;
  };

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: StringFieldUpdateOperationsInput | string;
    emailVerified?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    password?: NullableStringFieldUpdateOperationsInput | string | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    kycStatus?: EnumKycStatusFieldUpdateOperationsInput | $Enums.KycStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    riskProfile?: RiskProfileUncheckedUpdateOneWithoutUserNestedInput;
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput;
    portfolios?: PortfolioUncheckedUpdateManyWithoutUserNestedInput;
    transactions?: TransactionUncheckedUpdateManyWithoutUserNestedInput;
    watchlist?: WatchlistUncheckedUpdateManyWithoutUserNestedInput;
  };

  export type UserCreateManyInput = {
    id?: string;
    name?: string | null;
    email: string;
    emailVerified?: Date | string | null;
    password?: string | null;
    image?: string | null;
    role?: $Enums.UserRole;
    kycStatus?: $Enums.KycStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: StringFieldUpdateOperationsInput | string;
    emailVerified?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    password?: NullableStringFieldUpdateOperationsInput | string | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    kycStatus?: EnumKycStatusFieldUpdateOperationsInput | $Enums.KycStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: StringFieldUpdateOperationsInput | string;
    emailVerified?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    password?: NullableStringFieldUpdateOperationsInput | string | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    kycStatus?: EnumKycStatusFieldUpdateOperationsInput | $Enums.KycStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AccountCreateInput = {
    id?: string;
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token?: string | null;
    access_token?: string | null;
    expires_at?: number | null;
    token_type?: string | null;
    scope?: string | null;
    id_token?: string | null;
    session_state?: string | null;
    user: UserCreateNestedOneWithoutAccountsInput;
  };

  export type AccountUncheckedCreateInput = {
    id?: string;
    userId: string;
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token?: string | null;
    access_token?: string | null;
    expires_at?: number | null;
    token_type?: string | null;
    scope?: string | null;
    id_token?: string | null;
    session_state?: string | null;
  };

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    type?: StringFieldUpdateOperationsInput | string;
    provider?: StringFieldUpdateOperationsInput | string;
    providerAccountId?: StringFieldUpdateOperationsInput | string;
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null;
    access_token?: NullableStringFieldUpdateOperationsInput | string | null;
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null;
    token_type?: NullableStringFieldUpdateOperationsInput | string | null;
    scope?: NullableStringFieldUpdateOperationsInput | string | null;
    id_token?: NullableStringFieldUpdateOperationsInput | string | null;
    session_state?: NullableStringFieldUpdateOperationsInput | string | null;
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput;
  };

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    type?: StringFieldUpdateOperationsInput | string;
    provider?: StringFieldUpdateOperationsInput | string;
    providerAccountId?: StringFieldUpdateOperationsInput | string;
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null;
    access_token?: NullableStringFieldUpdateOperationsInput | string | null;
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null;
    token_type?: NullableStringFieldUpdateOperationsInput | string | null;
    scope?: NullableStringFieldUpdateOperationsInput | string | null;
    id_token?: NullableStringFieldUpdateOperationsInput | string | null;
    session_state?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type AccountCreateManyInput = {
    id?: string;
    userId: string;
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token?: string | null;
    access_token?: string | null;
    expires_at?: number | null;
    token_type?: string | null;
    scope?: string | null;
    id_token?: string | null;
    session_state?: string | null;
  };

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    type?: StringFieldUpdateOperationsInput | string;
    provider?: StringFieldUpdateOperationsInput | string;
    providerAccountId?: StringFieldUpdateOperationsInput | string;
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null;
    access_token?: NullableStringFieldUpdateOperationsInput | string | null;
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null;
    token_type?: NullableStringFieldUpdateOperationsInput | string | null;
    scope?: NullableStringFieldUpdateOperationsInput | string | null;
    id_token?: NullableStringFieldUpdateOperationsInput | string | null;
    session_state?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    type?: StringFieldUpdateOperationsInput | string;
    provider?: StringFieldUpdateOperationsInput | string;
    providerAccountId?: StringFieldUpdateOperationsInput | string;
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null;
    access_token?: NullableStringFieldUpdateOperationsInput | string | null;
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null;
    token_type?: NullableStringFieldUpdateOperationsInput | string | null;
    scope?: NullableStringFieldUpdateOperationsInput | string | null;
    id_token?: NullableStringFieldUpdateOperationsInput | string | null;
    session_state?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type SessionCreateInput = {
    id?: string;
    sessionToken: string;
    expires: Date | string;
    user: UserCreateNestedOneWithoutSessionsInput;
  };

  export type SessionUncheckedCreateInput = {
    id?: string;
    sessionToken: string;
    userId: string;
    expires: Date | string;
  };

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    sessionToken?: StringFieldUpdateOperationsInput | string;
    expires?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput;
  };

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    sessionToken?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    expires?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SessionCreateManyInput = {
    id?: string;
    sessionToken: string;
    userId: string;
    expires: Date | string;
  };

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    sessionToken?: StringFieldUpdateOperationsInput | string;
    expires?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    sessionToken?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    expires?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type VerificationTokenCreateInput = {
    identifier: string;
    token: string;
    expires: Date | string;
  };

  export type VerificationTokenUncheckedCreateInput = {
    identifier: string;
    token: string;
    expires: Date | string;
  };

  export type VerificationTokenUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string;
    token?: StringFieldUpdateOperationsInput | string;
    expires?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type VerificationTokenUncheckedUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string;
    token?: StringFieldUpdateOperationsInput | string;
    expires?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type VerificationTokenCreateManyInput = {
    identifier: string;
    token: string;
    expires: Date | string;
  };

  export type VerificationTokenUpdateManyMutationInput = {
    identifier?: StringFieldUpdateOperationsInput | string;
    token?: StringFieldUpdateOperationsInput | string;
    expires?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type VerificationTokenUncheckedUpdateManyInput = {
    identifier?: StringFieldUpdateOperationsInput | string;
    token?: StringFieldUpdateOperationsInput | string;
    expires?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type FundCreateInput = {
    id?: string;
    schemeCode: string;
    schemeName: string;
    amcName: string;
    category: string;
    subCategory?: string | null;
    nav: Decimal | DecimalJsLike | number | string;
    aum?: Decimal | DecimalJsLike | number | string | null;
    expenseRatio?: Decimal | DecimalJsLike | number | string | null;
    sharpeRatio?: Decimal | DecimalJsLike | number | string | null;
    alpha?: Decimal | DecimalJsLike | number | string | null;
    beta?: Decimal | DecimalJsLike | number | string | null;
    stdDeviation?: Decimal | DecimalJsLike | number | string | null;
    returns1y?: Decimal | DecimalJsLike | number | string | null;
    returns3y?: Decimal | DecimalJsLike | number | string | null;
    returns5y?: Decimal | DecimalJsLike | number | string | null;
    returns10y?: Decimal | DecimalJsLike | number | string | null;
    managerName?: string | null;
    launchDate?: Date | string | null;
    benchmarkIndex?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    navHistory?: NavHistoryCreateNestedManyWithoutFundInput;
    holdings?: HoldingCreateNestedManyWithoutFundInput;
    transactions?: TransactionCreateNestedManyWithoutFundInput;
    watchlist?: WatchlistCreateNestedManyWithoutFundInput;
  };

  export type FundUncheckedCreateInput = {
    id?: string;
    schemeCode: string;
    schemeName: string;
    amcName: string;
    category: string;
    subCategory?: string | null;
    nav: Decimal | DecimalJsLike | number | string;
    aum?: Decimal | DecimalJsLike | number | string | null;
    expenseRatio?: Decimal | DecimalJsLike | number | string | null;
    sharpeRatio?: Decimal | DecimalJsLike | number | string | null;
    alpha?: Decimal | DecimalJsLike | number | string | null;
    beta?: Decimal | DecimalJsLike | number | string | null;
    stdDeviation?: Decimal | DecimalJsLike | number | string | null;
    returns1y?: Decimal | DecimalJsLike | number | string | null;
    returns3y?: Decimal | DecimalJsLike | number | string | null;
    returns5y?: Decimal | DecimalJsLike | number | string | null;
    returns10y?: Decimal | DecimalJsLike | number | string | null;
    managerName?: string | null;
    launchDate?: Date | string | null;
    benchmarkIndex?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    navHistory?: NavHistoryUncheckedCreateNestedManyWithoutFundInput;
    holdings?: HoldingUncheckedCreateNestedManyWithoutFundInput;
    transactions?: TransactionUncheckedCreateNestedManyWithoutFundInput;
    watchlist?: WatchlistUncheckedCreateNestedManyWithoutFundInput;
  };

  export type FundUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    schemeCode?: StringFieldUpdateOperationsInput | string;
    schemeName?: StringFieldUpdateOperationsInput | string;
    amcName?: StringFieldUpdateOperationsInput | string;
    category?: StringFieldUpdateOperationsInput | string;
    subCategory?: NullableStringFieldUpdateOperationsInput | string | null;
    nav?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    aum?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    expenseRatio?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    sharpeRatio?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    alpha?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    beta?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    stdDeviation?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    returns1y?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    returns3y?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    returns5y?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    returns10y?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    managerName?: NullableStringFieldUpdateOperationsInput | string | null;
    launchDate?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    benchmarkIndex?: NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    navHistory?: NavHistoryUpdateManyWithoutFundNestedInput;
    holdings?: HoldingUpdateManyWithoutFundNestedInput;
    transactions?: TransactionUpdateManyWithoutFundNestedInput;
    watchlist?: WatchlistUpdateManyWithoutFundNestedInput;
  };

  export type FundUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    schemeCode?: StringFieldUpdateOperationsInput | string;
    schemeName?: StringFieldUpdateOperationsInput | string;
    amcName?: StringFieldUpdateOperationsInput | string;
    category?: StringFieldUpdateOperationsInput | string;
    subCategory?: NullableStringFieldUpdateOperationsInput | string | null;
    nav?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    aum?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    expenseRatio?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    sharpeRatio?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    alpha?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    beta?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    stdDeviation?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    returns1y?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    returns3y?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    returns5y?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    returns10y?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    managerName?: NullableStringFieldUpdateOperationsInput | string | null;
    launchDate?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    benchmarkIndex?: NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    navHistory?: NavHistoryUncheckedUpdateManyWithoutFundNestedInput;
    holdings?: HoldingUncheckedUpdateManyWithoutFundNestedInput;
    transactions?: TransactionUncheckedUpdateManyWithoutFundNestedInput;
    watchlist?: WatchlistUncheckedUpdateManyWithoutFundNestedInput;
  };

  export type FundCreateManyInput = {
    id?: string;
    schemeCode: string;
    schemeName: string;
    amcName: string;
    category: string;
    subCategory?: string | null;
    nav: Decimal | DecimalJsLike | number | string;
    aum?: Decimal | DecimalJsLike | number | string | null;
    expenseRatio?: Decimal | DecimalJsLike | number | string | null;
    sharpeRatio?: Decimal | DecimalJsLike | number | string | null;
    alpha?: Decimal | DecimalJsLike | number | string | null;
    beta?: Decimal | DecimalJsLike | number | string | null;
    stdDeviation?: Decimal | DecimalJsLike | number | string | null;
    returns1y?: Decimal | DecimalJsLike | number | string | null;
    returns3y?: Decimal | DecimalJsLike | number | string | null;
    returns5y?: Decimal | DecimalJsLike | number | string | null;
    returns10y?: Decimal | DecimalJsLike | number | string | null;
    managerName?: string | null;
    launchDate?: Date | string | null;
    benchmarkIndex?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type FundUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    schemeCode?: StringFieldUpdateOperationsInput | string;
    schemeName?: StringFieldUpdateOperationsInput | string;
    amcName?: StringFieldUpdateOperationsInput | string;
    category?: StringFieldUpdateOperationsInput | string;
    subCategory?: NullableStringFieldUpdateOperationsInput | string | null;
    nav?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    aum?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    expenseRatio?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    sharpeRatio?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    alpha?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    beta?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    stdDeviation?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    returns1y?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    returns3y?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    returns5y?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    returns10y?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    managerName?: NullableStringFieldUpdateOperationsInput | string | null;
    launchDate?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    benchmarkIndex?: NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type FundUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    schemeCode?: StringFieldUpdateOperationsInput | string;
    schemeName?: StringFieldUpdateOperationsInput | string;
    amcName?: StringFieldUpdateOperationsInput | string;
    category?: StringFieldUpdateOperationsInput | string;
    subCategory?: NullableStringFieldUpdateOperationsInput | string | null;
    nav?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    aum?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    expenseRatio?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    sharpeRatio?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    alpha?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    beta?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    stdDeviation?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    returns1y?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    returns3y?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    returns5y?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    returns10y?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    managerName?: NullableStringFieldUpdateOperationsInput | string | null;
    launchDate?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    benchmarkIndex?: NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type NavHistoryCreateInput = {
    id?: string;
    nav: Decimal | DecimalJsLike | number | string;
    date: Date | string;
    createdAt?: Date | string;
    fund: FundCreateNestedOneWithoutNavHistoryInput;
  };

  export type NavHistoryUncheckedCreateInput = {
    id?: string;
    fundId: string;
    nav: Decimal | DecimalJsLike | number | string;
    date: Date | string;
    createdAt?: Date | string;
  };

  export type NavHistoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    nav?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    date?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    fund?: FundUpdateOneRequiredWithoutNavHistoryNestedInput;
  };

  export type NavHistoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    fundId?: StringFieldUpdateOperationsInput | string;
    nav?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    date?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type NavHistoryCreateManyInput = {
    id?: string;
    fundId: string;
    nav: Decimal | DecimalJsLike | number | string;
    date: Date | string;
    createdAt?: Date | string;
  };

  export type NavHistoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    nav?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    date?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type NavHistoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    fundId?: StringFieldUpdateOperationsInput | string;
    nav?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    date?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type PortfolioCreateInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: UserCreateNestedOneWithoutPortfoliosInput;
    holdings?: HoldingCreateNestedManyWithoutPortfolioInput;
  };

  export type PortfolioUncheckedCreateInput = {
    id?: string;
    userId: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    holdings?: HoldingUncheckedCreateNestedManyWithoutPortfolioInput;
  };

  export type PortfolioUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutPortfoliosNestedInput;
    holdings?: HoldingUpdateManyWithoutPortfolioNestedInput;
  };

  export type PortfolioUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    holdings?: HoldingUncheckedUpdateManyWithoutPortfolioNestedInput;
  };

  export type PortfolioCreateManyInput = {
    id?: string;
    userId: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type PortfolioUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type PortfolioUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type HoldingCreateInput = {
    id?: string;
    units: Decimal | DecimalJsLike | number | string;
    avgNav: Decimal | DecimalJsLike | number | string;
    investedAmount: Decimal | DecimalJsLike | number | string;
    purchaseDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    portfolio: PortfolioCreateNestedOneWithoutHoldingsInput;
    fund: FundCreateNestedOneWithoutHoldingsInput;
  };

  export type HoldingUncheckedCreateInput = {
    id?: string;
    portfolioId: string;
    fundId: string;
    units: Decimal | DecimalJsLike | number | string;
    avgNav: Decimal | DecimalJsLike | number | string;
    investedAmount: Decimal | DecimalJsLike | number | string;
    purchaseDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type HoldingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    units?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    avgNav?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    investedAmount?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    purchaseDate?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    portfolio?: PortfolioUpdateOneRequiredWithoutHoldingsNestedInput;
    fund?: FundUpdateOneRequiredWithoutHoldingsNestedInput;
  };

  export type HoldingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    portfolioId?: StringFieldUpdateOperationsInput | string;
    fundId?: StringFieldUpdateOperationsInput | string;
    units?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    avgNav?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    investedAmount?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    purchaseDate?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type HoldingCreateManyInput = {
    id?: string;
    portfolioId: string;
    fundId: string;
    units: Decimal | DecimalJsLike | number | string;
    avgNav: Decimal | DecimalJsLike | number | string;
    investedAmount: Decimal | DecimalJsLike | number | string;
    purchaseDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type HoldingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    units?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    avgNav?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    investedAmount?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    purchaseDate?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type HoldingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    portfolioId?: StringFieldUpdateOperationsInput | string;
    fundId?: StringFieldUpdateOperationsInput | string;
    units?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    avgNav?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    investedAmount?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    purchaseDate?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type TransactionCreateInput = {
    id?: string;
    type: $Enums.TransactionType;
    amount: Decimal | DecimalJsLike | number | string;
    units: Decimal | DecimalJsLike | number | string;
    nav: Decimal | DecimalJsLike | number | string;
    date: Date | string;
    status?: $Enums.TransactionStatus;
    createdAt?: Date | string;
    user: UserCreateNestedOneWithoutTransactionsInput;
    fund: FundCreateNestedOneWithoutTransactionsInput;
  };

  export type TransactionUncheckedCreateInput = {
    id?: string;
    userId: string;
    fundId: string;
    type: $Enums.TransactionType;
    amount: Decimal | DecimalJsLike | number | string;
    units: Decimal | DecimalJsLike | number | string;
    nav: Decimal | DecimalJsLike | number | string;
    date: Date | string;
    status?: $Enums.TransactionStatus;
    createdAt?: Date | string;
  };

  export type TransactionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    type?:
      | EnumTransactionTypeFieldUpdateOperationsInput
      | $Enums.TransactionType;
    amount?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    units?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    nav?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    date?: DateTimeFieldUpdateOperationsInput | Date | string;
    status?:
      | EnumTransactionStatusFieldUpdateOperationsInput
      | $Enums.TransactionStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutTransactionsNestedInput;
    fund?: FundUpdateOneRequiredWithoutTransactionsNestedInput;
  };

  export type TransactionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    fundId?: StringFieldUpdateOperationsInput | string;
    type?:
      | EnumTransactionTypeFieldUpdateOperationsInput
      | $Enums.TransactionType;
    amount?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    units?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    nav?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    date?: DateTimeFieldUpdateOperationsInput | Date | string;
    status?:
      | EnumTransactionStatusFieldUpdateOperationsInput
      | $Enums.TransactionStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type TransactionCreateManyInput = {
    id?: string;
    userId: string;
    fundId: string;
    type: $Enums.TransactionType;
    amount: Decimal | DecimalJsLike | number | string;
    units: Decimal | DecimalJsLike | number | string;
    nav: Decimal | DecimalJsLike | number | string;
    date: Date | string;
    status?: $Enums.TransactionStatus;
    createdAt?: Date | string;
  };

  export type TransactionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    type?:
      | EnumTransactionTypeFieldUpdateOperationsInput
      | $Enums.TransactionType;
    amount?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    units?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    nav?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    date?: DateTimeFieldUpdateOperationsInput | Date | string;
    status?:
      | EnumTransactionStatusFieldUpdateOperationsInput
      | $Enums.TransactionStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type TransactionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    fundId?: StringFieldUpdateOperationsInput | string;
    type?:
      | EnumTransactionTypeFieldUpdateOperationsInput
      | $Enums.TransactionType;
    amount?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    units?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    nav?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    date?: DateTimeFieldUpdateOperationsInput | Date | string;
    status?:
      | EnumTransactionStatusFieldUpdateOperationsInput
      | $Enums.TransactionStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type WatchlistCreateInput = {
    id?: string;
    addedAt?: Date | string;
    createdAt?: Date | string;
    user: UserCreateNestedOneWithoutWatchlistInput;
    fund: FundCreateNestedOneWithoutWatchlistInput;
  };

  export type WatchlistUncheckedCreateInput = {
    id?: string;
    userId: string;
    fundId: string;
    addedAt?: Date | string;
    createdAt?: Date | string;
  };

  export type WatchlistUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutWatchlistNestedInput;
    fund?: FundUpdateOneRequiredWithoutWatchlistNestedInput;
  };

  export type WatchlistUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    fundId?: StringFieldUpdateOperationsInput | string;
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type WatchlistCreateManyInput = {
    id?: string;
    userId: string;
    fundId: string;
    addedAt?: Date | string;
    createdAt?: Date | string;
  };

  export type WatchlistUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type WatchlistUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    fundId?: StringFieldUpdateOperationsInput | string;
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type RiskProfileCreateInput = {
    id?: string;
    score: number;
    category: $Enums.RiskCategory;
    answers: JsonNullValueInput | InputJsonValue;
    completedAt: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: UserCreateNestedOneWithoutRiskProfileInput;
  };

  export type RiskProfileUncheckedCreateInput = {
    id?: string;
    userId: string;
    score: number;
    category: $Enums.RiskCategory;
    answers: JsonNullValueInput | InputJsonValue;
    completedAt: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type RiskProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    score?: IntFieldUpdateOperationsInput | number;
    category?: EnumRiskCategoryFieldUpdateOperationsInput | $Enums.RiskCategory;
    answers?: JsonNullValueInput | InputJsonValue;
    completedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutRiskProfileNestedInput;
  };

  export type RiskProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    score?: IntFieldUpdateOperationsInput | number;
    category?: EnumRiskCategoryFieldUpdateOperationsInput | $Enums.RiskCategory;
    answers?: JsonNullValueInput | InputJsonValue;
    completedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type RiskProfileCreateManyInput = {
    id?: string;
    userId: string;
    score: number;
    category: $Enums.RiskCategory;
    answers: JsonNullValueInput | InputJsonValue;
    completedAt: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type RiskProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    score?: IntFieldUpdateOperationsInput | number;
    category?: EnumRiskCategoryFieldUpdateOperationsInput | $Enums.RiskCategory;
    answers?: JsonNullValueInput | InputJsonValue;
    completedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type RiskProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    score?: IntFieldUpdateOperationsInput | number;
    category?: EnumRiskCategoryFieldUpdateOperationsInput | $Enums.RiskCategory;
    answers?: JsonNullValueInput | InputJsonValue;
    completedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringFilter<$PrismaModel> | string;
  };

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringNullableFilter<$PrismaModel> | string | null;
  };

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
  };

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>;
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole;
  };

  export type EnumKycStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.KycStatus | EnumKycStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.KycStatus[] | ListEnumKycStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.KycStatus[] | ListEnumKycStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumKycStatusFilter<$PrismaModel> | $Enums.KycStatus;
  };

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  };

  export type RiskProfileNullableScalarRelationFilter = {
    is?: RiskProfileWhereInput | null;
    isNot?: RiskProfileWhereInput | null;
  };

  export type AccountListRelationFilter = {
    every?: AccountWhereInput;
    some?: AccountWhereInput;
    none?: AccountWhereInput;
  };

  export type SessionListRelationFilter = {
    every?: SessionWhereInput;
    some?: SessionWhereInput;
    none?: SessionWhereInput;
  };

  export type PortfolioListRelationFilter = {
    every?: PortfolioWhereInput;
    some?: PortfolioWhereInput;
    none?: PortfolioWhereInput;
  };

  export type TransactionListRelationFilter = {
    every?: TransactionWhereInput;
    some?: TransactionWhereInput;
    none?: TransactionWhereInput;
  };

  export type WatchlistListRelationFilter = {
    every?: WatchlistWhereInput;
    some?: WatchlistWhereInput;
    none?: WatchlistWhereInput;
  };

  export type SortOrderInput = {
    sort: SortOrder;
    nulls?: NullsOrder;
  };

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type PortfolioOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type TransactionOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type WatchlistOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    email?: SortOrder;
    emailVerified?: SortOrder;
    password?: SortOrder;
    image?: SortOrder;
    role?: SortOrder;
    kycStatus?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    email?: SortOrder;
    emailVerified?: SortOrder;
    password?: SortOrder;
    image?: SortOrder;
    role?: SortOrder;
    kycStatus?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    email?: SortOrder;
    emailVerified?: SortOrder;
    password?: SortOrder;
    image?: SortOrder;
    role?: SortOrder;
    kycStatus?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?:
      | NestedStringNullableWithAggregatesFilter<$PrismaModel>
      | string
      | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  };

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?:
      | NestedDateTimeNullableWithAggregatesFilter<$PrismaModel>
      | Date
      | string
      | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedDateTimeNullableFilter<$PrismaModel>;
    _max?: NestedDateTimeNullableFilter<$PrismaModel>;
  };

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumUserRoleWithAggregatesFilter<$PrismaModel>
      | $Enums.UserRole;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumUserRoleFilter<$PrismaModel>;
    _max?: NestedEnumUserRoleFilter<$PrismaModel>;
  };

  export type EnumKycStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.KycStatus | EnumKycStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.KycStatus[] | ListEnumKycStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.KycStatus[] | ListEnumKycStatusFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumKycStatusWithAggregatesFilter<$PrismaModel>
      | $Enums.KycStatus;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumKycStatusFilter<$PrismaModel>;
    _max?: NestedEnumKycStatusFilter<$PrismaModel>;
  };

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableFilter<$PrismaModel> | number | null;
  };

  export type UserScalarRelationFilter = {
    is?: UserWhereInput;
    isNot?: UserWhereInput;
  };

  export type AccountProviderProviderAccountIdCompoundUniqueInput = {
    provider: string;
    providerAccountId: string;
  };

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    type?: SortOrder;
    provider?: SortOrder;
    providerAccountId?: SortOrder;
    refresh_token?: SortOrder;
    access_token?: SortOrder;
    expires_at?: SortOrder;
    token_type?: SortOrder;
    scope?: SortOrder;
    id_token?: SortOrder;
    session_state?: SortOrder;
  };

  export type AccountAvgOrderByAggregateInput = {
    expires_at?: SortOrder;
  };

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    type?: SortOrder;
    provider?: SortOrder;
    providerAccountId?: SortOrder;
    refresh_token?: SortOrder;
    access_token?: SortOrder;
    expires_at?: SortOrder;
    token_type?: SortOrder;
    scope?: SortOrder;
    id_token?: SortOrder;
    session_state?: SortOrder;
  };

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    type?: SortOrder;
    provider?: SortOrder;
    providerAccountId?: SortOrder;
    refresh_token?: SortOrder;
    access_token?: SortOrder;
    expires_at?: SortOrder;
    token_type?: SortOrder;
    scope?: SortOrder;
    id_token?: SortOrder;
    session_state?: SortOrder;
  };

  export type AccountSumOrderByAggregateInput = {
    expires_at?: SortOrder;
  };

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _avg?: NestedFloatNullableFilter<$PrismaModel>;
    _sum?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedIntNullableFilter<$PrismaModel>;
    _max?: NestedIntNullableFilter<$PrismaModel>;
  };

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder;
    sessionToken?: SortOrder;
    userId?: SortOrder;
    expires?: SortOrder;
  };

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder;
    sessionToken?: SortOrder;
    userId?: SortOrder;
    expires?: SortOrder;
  };

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder;
    sessionToken?: SortOrder;
    userId?: SortOrder;
    expires?: SortOrder;
  };

  export type VerificationTokenIdentifierTokenCompoundUniqueInput = {
    identifier: string;
    token: string;
  };

  export type VerificationTokenCountOrderByAggregateInput = {
    identifier?: SortOrder;
    token?: SortOrder;
    expires?: SortOrder;
  };

  export type VerificationTokenMaxOrderByAggregateInput = {
    identifier?: SortOrder;
    token?: SortOrder;
    expires?: SortOrder;
  };

  export type VerificationTokenMinOrderByAggregateInput = {
    identifier?: SortOrder;
    token?: SortOrder;
    expires?: SortOrder;
  };

  export type DecimalFilter<$PrismaModel = never> = {
    equals?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    in?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>;
    notIn?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>;
    lt?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    lte?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    gt?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    gte?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    not?:
      | NestedDecimalFilter<$PrismaModel>
      | Decimal
      | DecimalJsLike
      | number
      | string;
  };

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>
      | null;
    in?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>
      | null;
    notIn?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>
      | null;
    lt?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    lte?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    gt?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    gte?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    not?:
      | NestedDecimalNullableFilter<$PrismaModel>
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
  };

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolFilter<$PrismaModel> | boolean;
  };

  export type NavHistoryListRelationFilter = {
    every?: NavHistoryWhereInput;
    some?: NavHistoryWhereInput;
    none?: NavHistoryWhereInput;
  };

  export type HoldingListRelationFilter = {
    every?: HoldingWhereInput;
    some?: HoldingWhereInput;
    none?: HoldingWhereInput;
  };

  export type NavHistoryOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type HoldingOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type FundCountOrderByAggregateInput = {
    id?: SortOrder;
    schemeCode?: SortOrder;
    schemeName?: SortOrder;
    amcName?: SortOrder;
    category?: SortOrder;
    subCategory?: SortOrder;
    nav?: SortOrder;
    aum?: SortOrder;
    expenseRatio?: SortOrder;
    sharpeRatio?: SortOrder;
    alpha?: SortOrder;
    beta?: SortOrder;
    stdDeviation?: SortOrder;
    returns1y?: SortOrder;
    returns3y?: SortOrder;
    returns5y?: SortOrder;
    returns10y?: SortOrder;
    managerName?: SortOrder;
    launchDate?: SortOrder;
    benchmarkIndex?: SortOrder;
    isActive?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type FundAvgOrderByAggregateInput = {
    nav?: SortOrder;
    aum?: SortOrder;
    expenseRatio?: SortOrder;
    sharpeRatio?: SortOrder;
    alpha?: SortOrder;
    beta?: SortOrder;
    stdDeviation?: SortOrder;
    returns1y?: SortOrder;
    returns3y?: SortOrder;
    returns5y?: SortOrder;
    returns10y?: SortOrder;
  };

  export type FundMaxOrderByAggregateInput = {
    id?: SortOrder;
    schemeCode?: SortOrder;
    schemeName?: SortOrder;
    amcName?: SortOrder;
    category?: SortOrder;
    subCategory?: SortOrder;
    nav?: SortOrder;
    aum?: SortOrder;
    expenseRatio?: SortOrder;
    sharpeRatio?: SortOrder;
    alpha?: SortOrder;
    beta?: SortOrder;
    stdDeviation?: SortOrder;
    returns1y?: SortOrder;
    returns3y?: SortOrder;
    returns5y?: SortOrder;
    returns10y?: SortOrder;
    managerName?: SortOrder;
    launchDate?: SortOrder;
    benchmarkIndex?: SortOrder;
    isActive?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type FundMinOrderByAggregateInput = {
    id?: SortOrder;
    schemeCode?: SortOrder;
    schemeName?: SortOrder;
    amcName?: SortOrder;
    category?: SortOrder;
    subCategory?: SortOrder;
    nav?: SortOrder;
    aum?: SortOrder;
    expenseRatio?: SortOrder;
    sharpeRatio?: SortOrder;
    alpha?: SortOrder;
    beta?: SortOrder;
    stdDeviation?: SortOrder;
    returns1y?: SortOrder;
    returns3y?: SortOrder;
    returns5y?: SortOrder;
    returns10y?: SortOrder;
    managerName?: SortOrder;
    launchDate?: SortOrder;
    benchmarkIndex?: SortOrder;
    isActive?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type FundSumOrderByAggregateInput = {
    nav?: SortOrder;
    aum?: SortOrder;
    expenseRatio?: SortOrder;
    sharpeRatio?: SortOrder;
    alpha?: SortOrder;
    beta?: SortOrder;
    stdDeviation?: SortOrder;
    returns1y?: SortOrder;
    returns3y?: SortOrder;
    returns5y?: SortOrder;
    returns10y?: SortOrder;
  };

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    in?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>;
    notIn?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>;
    lt?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    lte?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    gt?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    gte?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    not?:
      | NestedDecimalWithAggregatesFilter<$PrismaModel>
      | Decimal
      | DecimalJsLike
      | number
      | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedDecimalFilter<$PrismaModel>;
    _sum?: NestedDecimalFilter<$PrismaModel>;
    _min?: NestedDecimalFilter<$PrismaModel>;
    _max?: NestedDecimalFilter<$PrismaModel>;
  };

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>
      | null;
    in?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>
      | null;
    notIn?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>
      | null;
    lt?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    lte?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    gt?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    gte?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    not?:
      | NestedDecimalNullableWithAggregatesFilter<$PrismaModel>
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _avg?: NestedDecimalNullableFilter<$PrismaModel>;
    _sum?: NestedDecimalNullableFilter<$PrismaModel>;
    _min?: NestedDecimalNullableFilter<$PrismaModel>;
    _max?: NestedDecimalNullableFilter<$PrismaModel>;
  };

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedBoolFilter<$PrismaModel>;
    _max?: NestedBoolFilter<$PrismaModel>;
  };

  export type FundScalarRelationFilter = {
    is?: FundWhereInput;
    isNot?: FundWhereInput;
  };

  export type NavHistoryFundIdDateCompoundUniqueInput = {
    fundId: string;
    date: Date | string;
  };

  export type NavHistoryCountOrderByAggregateInput = {
    id?: SortOrder;
    fundId?: SortOrder;
    nav?: SortOrder;
    date?: SortOrder;
    createdAt?: SortOrder;
  };

  export type NavHistoryAvgOrderByAggregateInput = {
    nav?: SortOrder;
  };

  export type NavHistoryMaxOrderByAggregateInput = {
    id?: SortOrder;
    fundId?: SortOrder;
    nav?: SortOrder;
    date?: SortOrder;
    createdAt?: SortOrder;
  };

  export type NavHistoryMinOrderByAggregateInput = {
    id?: SortOrder;
    fundId?: SortOrder;
    nav?: SortOrder;
    date?: SortOrder;
    createdAt?: SortOrder;
  };

  export type NavHistorySumOrderByAggregateInput = {
    nav?: SortOrder;
  };

  export type PortfolioCountOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    name?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type PortfolioMaxOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    name?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type PortfolioMinOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    name?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type PortfolioScalarRelationFilter = {
    is?: PortfolioWhereInput;
    isNot?: PortfolioWhereInput;
  };

  export type HoldingCountOrderByAggregateInput = {
    id?: SortOrder;
    portfolioId?: SortOrder;
    fundId?: SortOrder;
    units?: SortOrder;
    avgNav?: SortOrder;
    investedAmount?: SortOrder;
    purchaseDate?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type HoldingAvgOrderByAggregateInput = {
    units?: SortOrder;
    avgNav?: SortOrder;
    investedAmount?: SortOrder;
  };

  export type HoldingMaxOrderByAggregateInput = {
    id?: SortOrder;
    portfolioId?: SortOrder;
    fundId?: SortOrder;
    units?: SortOrder;
    avgNav?: SortOrder;
    investedAmount?: SortOrder;
    purchaseDate?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type HoldingMinOrderByAggregateInput = {
    id?: SortOrder;
    portfolioId?: SortOrder;
    fundId?: SortOrder;
    units?: SortOrder;
    avgNav?: SortOrder;
    investedAmount?: SortOrder;
    purchaseDate?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type HoldingSumOrderByAggregateInput = {
    units?: SortOrder;
    avgNav?: SortOrder;
    investedAmount?: SortOrder;
  };

  export type EnumTransactionTypeFilter<$PrismaModel = never> = {
    equals?:
      | $Enums.TransactionType
      | EnumTransactionTypeFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.TransactionType[]
      | ListEnumTransactionTypeFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.TransactionType[]
      | ListEnumTransactionTypeFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumTransactionTypeFilter<$PrismaModel>
      | $Enums.TransactionType;
  };

  export type EnumTransactionStatusFilter<$PrismaModel = never> = {
    equals?:
      | $Enums.TransactionStatus
      | EnumTransactionStatusFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.TransactionStatus[]
      | ListEnumTransactionStatusFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.TransactionStatus[]
      | ListEnumTransactionStatusFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumTransactionStatusFilter<$PrismaModel>
      | $Enums.TransactionStatus;
  };

  export type TransactionCountOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    fundId?: SortOrder;
    type?: SortOrder;
    amount?: SortOrder;
    units?: SortOrder;
    nav?: SortOrder;
    date?: SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
  };

  export type TransactionAvgOrderByAggregateInput = {
    amount?: SortOrder;
    units?: SortOrder;
    nav?: SortOrder;
  };

  export type TransactionMaxOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    fundId?: SortOrder;
    type?: SortOrder;
    amount?: SortOrder;
    units?: SortOrder;
    nav?: SortOrder;
    date?: SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
  };

  export type TransactionMinOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    fundId?: SortOrder;
    type?: SortOrder;
    amount?: SortOrder;
    units?: SortOrder;
    nav?: SortOrder;
    date?: SortOrder;
    status?: SortOrder;
    createdAt?: SortOrder;
  };

  export type TransactionSumOrderByAggregateInput = {
    amount?: SortOrder;
    units?: SortOrder;
    nav?: SortOrder;
  };

  export type EnumTransactionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?:
      | $Enums.TransactionType
      | EnumTransactionTypeFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.TransactionType[]
      | ListEnumTransactionTypeFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.TransactionType[]
      | ListEnumTransactionTypeFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumTransactionTypeWithAggregatesFilter<$PrismaModel>
      | $Enums.TransactionType;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumTransactionTypeFilter<$PrismaModel>;
    _max?: NestedEnumTransactionTypeFilter<$PrismaModel>;
  };

  export type EnumTransactionStatusWithAggregatesFilter<$PrismaModel = never> =
    {
      equals?:
        | $Enums.TransactionStatus
        | EnumTransactionStatusFieldRefInput<$PrismaModel>;
      in?:
        | $Enums.TransactionStatus[]
        | ListEnumTransactionStatusFieldRefInput<$PrismaModel>;
      notIn?:
        | $Enums.TransactionStatus[]
        | ListEnumTransactionStatusFieldRefInput<$PrismaModel>;
      not?:
        | NestedEnumTransactionStatusWithAggregatesFilter<$PrismaModel>
        | $Enums.TransactionStatus;
      _count?: NestedIntFilter<$PrismaModel>;
      _min?: NestedEnumTransactionStatusFilter<$PrismaModel>;
      _max?: NestedEnumTransactionStatusFilter<$PrismaModel>;
    };

  export type WatchlistUserIdFundIdCompoundUniqueInput = {
    userId: string;
    fundId: string;
  };

  export type WatchlistCountOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    fundId?: SortOrder;
    addedAt?: SortOrder;
    createdAt?: SortOrder;
  };

  export type WatchlistMaxOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    fundId?: SortOrder;
    addedAt?: SortOrder;
    createdAt?: SortOrder;
  };

  export type WatchlistMinOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    fundId?: SortOrder;
    addedAt?: SortOrder;
    createdAt?: SortOrder;
  };

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntFilter<$PrismaModel> | number;
  };

  export type EnumRiskCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.RiskCategory | EnumRiskCategoryFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.RiskCategory[]
      | ListEnumRiskCategoryFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.RiskCategory[]
      | ListEnumRiskCategoryFieldRefInput<$PrismaModel>;
    not?: NestedEnumRiskCategoryFilter<$PrismaModel> | $Enums.RiskCategory;
  };
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<JsonFilterBase<$PrismaModel>>,
          Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>
        >,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>;

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?:
      | InputJsonValue
      | JsonFieldRefInput<$PrismaModel>
      | JsonNullValueFilter;
    path?: string[];
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    not?:
      | InputJsonValue
      | JsonFieldRefInput<$PrismaModel>
      | JsonNullValueFilter;
  };

  export type RiskProfileCountOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    score?: SortOrder;
    category?: SortOrder;
    answers?: SortOrder;
    completedAt?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type RiskProfileAvgOrderByAggregateInput = {
    score?: SortOrder;
  };

  export type RiskProfileMaxOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    score?: SortOrder;
    category?: SortOrder;
    completedAt?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type RiskProfileMinOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    score?: SortOrder;
    category?: SortOrder;
    completedAt?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type RiskProfileSumOrderByAggregateInput = {
    score?: SortOrder;
  };

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedIntFilter<$PrismaModel>;
    _min?: NestedIntFilter<$PrismaModel>;
    _max?: NestedIntFilter<$PrismaModel>;
  };

  export type EnumRiskCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RiskCategory | EnumRiskCategoryFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.RiskCategory[]
      | ListEnumRiskCategoryFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.RiskCategory[]
      | ListEnumRiskCategoryFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumRiskCategoryWithAggregatesFilter<$PrismaModel>
      | $Enums.RiskCategory;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumRiskCategoryFilter<$PrismaModel>;
    _max?: NestedEnumRiskCategoryFilter<$PrismaModel>;
  };
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<JsonWithAggregatesFilterBase<$PrismaModel>>,
          Exclude<
            keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>,
            'path'
          >
        >,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<
        Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>
      >;

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?:
      | InputJsonValue
      | JsonFieldRefInput<$PrismaModel>
      | JsonNullValueFilter;
    path?: string[];
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    not?:
      | InputJsonValue
      | JsonFieldRefInput<$PrismaModel>
      | JsonNullValueFilter;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedJsonFilter<$PrismaModel>;
    _max?: NestedJsonFilter<$PrismaModel>;
  };

  export type RiskProfileCreateNestedOneWithoutUserInput = {
    create?: XOR<
      RiskProfileCreateWithoutUserInput,
      RiskProfileUncheckedCreateWithoutUserInput
    >;
    connectOrCreate?: RiskProfileCreateOrConnectWithoutUserInput;
    connect?: RiskProfileWhereUniqueInput;
  };

  export type AccountCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          AccountCreateWithoutUserInput,
          AccountUncheckedCreateWithoutUserInput
        >
      | AccountCreateWithoutUserInput[]
      | AccountUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | AccountCreateOrConnectWithoutUserInput
      | AccountCreateOrConnectWithoutUserInput[];
    createMany?: AccountCreateManyUserInputEnvelope;
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
  };

  export type SessionCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          SessionCreateWithoutUserInput,
          SessionUncheckedCreateWithoutUserInput
        >
      | SessionCreateWithoutUserInput[]
      | SessionUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | SessionCreateOrConnectWithoutUserInput
      | SessionCreateOrConnectWithoutUserInput[];
    createMany?: SessionCreateManyUserInputEnvelope;
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
  };

  export type PortfolioCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          PortfolioCreateWithoutUserInput,
          PortfolioUncheckedCreateWithoutUserInput
        >
      | PortfolioCreateWithoutUserInput[]
      | PortfolioUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | PortfolioCreateOrConnectWithoutUserInput
      | PortfolioCreateOrConnectWithoutUserInput[];
    createMany?: PortfolioCreateManyUserInputEnvelope;
    connect?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[];
  };

  export type TransactionCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          TransactionCreateWithoutUserInput,
          TransactionUncheckedCreateWithoutUserInput
        >
      | TransactionCreateWithoutUserInput[]
      | TransactionUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | TransactionCreateOrConnectWithoutUserInput
      | TransactionCreateOrConnectWithoutUserInput[];
    createMany?: TransactionCreateManyUserInputEnvelope;
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[];
  };

  export type WatchlistCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          WatchlistCreateWithoutUserInput,
          WatchlistUncheckedCreateWithoutUserInput
        >
      | WatchlistCreateWithoutUserInput[]
      | WatchlistUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | WatchlistCreateOrConnectWithoutUserInput
      | WatchlistCreateOrConnectWithoutUserInput[];
    createMany?: WatchlistCreateManyUserInputEnvelope;
    connect?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[];
  };

  export type RiskProfileUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<
      RiskProfileCreateWithoutUserInput,
      RiskProfileUncheckedCreateWithoutUserInput
    >;
    connectOrCreate?: RiskProfileCreateOrConnectWithoutUserInput;
    connect?: RiskProfileWhereUniqueInput;
  };

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          AccountCreateWithoutUserInput,
          AccountUncheckedCreateWithoutUserInput
        >
      | AccountCreateWithoutUserInput[]
      | AccountUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | AccountCreateOrConnectWithoutUserInput
      | AccountCreateOrConnectWithoutUserInput[];
    createMany?: AccountCreateManyUserInputEnvelope;
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
  };

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          SessionCreateWithoutUserInput,
          SessionUncheckedCreateWithoutUserInput
        >
      | SessionCreateWithoutUserInput[]
      | SessionUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | SessionCreateOrConnectWithoutUserInput
      | SessionCreateOrConnectWithoutUserInput[];
    createMany?: SessionCreateManyUserInputEnvelope;
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
  };

  export type PortfolioUncheckedCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          PortfolioCreateWithoutUserInput,
          PortfolioUncheckedCreateWithoutUserInput
        >
      | PortfolioCreateWithoutUserInput[]
      | PortfolioUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | PortfolioCreateOrConnectWithoutUserInput
      | PortfolioCreateOrConnectWithoutUserInput[];
    createMany?: PortfolioCreateManyUserInputEnvelope;
    connect?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[];
  };

  export type TransactionUncheckedCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          TransactionCreateWithoutUserInput,
          TransactionUncheckedCreateWithoutUserInput
        >
      | TransactionCreateWithoutUserInput[]
      | TransactionUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | TransactionCreateOrConnectWithoutUserInput
      | TransactionCreateOrConnectWithoutUserInput[];
    createMany?: TransactionCreateManyUserInputEnvelope;
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[];
  };

  export type WatchlistUncheckedCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<
          WatchlistCreateWithoutUserInput,
          WatchlistUncheckedCreateWithoutUserInput
        >
      | WatchlistCreateWithoutUserInput[]
      | WatchlistUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | WatchlistCreateOrConnectWithoutUserInput
      | WatchlistCreateOrConnectWithoutUserInput[];
    createMany?: WatchlistCreateManyUserInputEnvelope;
    connect?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[];
  };

  export type StringFieldUpdateOperationsInput = {
    set?: string;
  };

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
  };

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
  };

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole;
  };

  export type EnumKycStatusFieldUpdateOperationsInput = {
    set?: $Enums.KycStatus;
  };

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
  };

  export type RiskProfileUpdateOneWithoutUserNestedInput = {
    create?: XOR<
      RiskProfileCreateWithoutUserInput,
      RiskProfileUncheckedCreateWithoutUserInput
    >;
    connectOrCreate?: RiskProfileCreateOrConnectWithoutUserInput;
    upsert?: RiskProfileUpsertWithoutUserInput;
    disconnect?: RiskProfileWhereInput | boolean;
    delete?: RiskProfileWhereInput | boolean;
    connect?: RiskProfileWhereUniqueInput;
    update?: XOR<
      XOR<
        RiskProfileUpdateToOneWithWhereWithoutUserInput,
        RiskProfileUpdateWithoutUserInput
      >,
      RiskProfileUncheckedUpdateWithoutUserInput
    >;
  };

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          AccountCreateWithoutUserInput,
          AccountUncheckedCreateWithoutUserInput
        >
      | AccountCreateWithoutUserInput[]
      | AccountUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | AccountCreateOrConnectWithoutUserInput
      | AccountCreateOrConnectWithoutUserInput[];
    upsert?:
      | AccountUpsertWithWhereUniqueWithoutUserInput
      | AccountUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: AccountCreateManyUserInputEnvelope;
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
    update?:
      | AccountUpdateWithWhereUniqueWithoutUserInput
      | AccountUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | AccountUpdateManyWithWhereWithoutUserInput
      | AccountUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[];
  };

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          SessionCreateWithoutUserInput,
          SessionUncheckedCreateWithoutUserInput
        >
      | SessionCreateWithoutUserInput[]
      | SessionUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | SessionCreateOrConnectWithoutUserInput
      | SessionCreateOrConnectWithoutUserInput[];
    upsert?:
      | SessionUpsertWithWhereUniqueWithoutUserInput
      | SessionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: SessionCreateManyUserInputEnvelope;
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    update?:
      | SessionUpdateWithWhereUniqueWithoutUserInput
      | SessionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | SessionUpdateManyWithWhereWithoutUserInput
      | SessionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[];
  };

  export type PortfolioUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          PortfolioCreateWithoutUserInput,
          PortfolioUncheckedCreateWithoutUserInput
        >
      | PortfolioCreateWithoutUserInput[]
      | PortfolioUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | PortfolioCreateOrConnectWithoutUserInput
      | PortfolioCreateOrConnectWithoutUserInput[];
    upsert?:
      | PortfolioUpsertWithWhereUniqueWithoutUserInput
      | PortfolioUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: PortfolioCreateManyUserInputEnvelope;
    set?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[];
    disconnect?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[];
    delete?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[];
    connect?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[];
    update?:
      | PortfolioUpdateWithWhereUniqueWithoutUserInput
      | PortfolioUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | PortfolioUpdateManyWithWhereWithoutUserInput
      | PortfolioUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: PortfolioScalarWhereInput | PortfolioScalarWhereInput[];
  };

  export type TransactionUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          TransactionCreateWithoutUserInput,
          TransactionUncheckedCreateWithoutUserInput
        >
      | TransactionCreateWithoutUserInput[]
      | TransactionUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | TransactionCreateOrConnectWithoutUserInput
      | TransactionCreateOrConnectWithoutUserInput[];
    upsert?:
      | TransactionUpsertWithWhereUniqueWithoutUserInput
      | TransactionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: TransactionCreateManyUserInputEnvelope;
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[];
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[];
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[];
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[];
    update?:
      | TransactionUpdateWithWhereUniqueWithoutUserInput
      | TransactionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | TransactionUpdateManyWithWhereWithoutUserInput
      | TransactionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[];
  };

  export type WatchlistUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          WatchlistCreateWithoutUserInput,
          WatchlistUncheckedCreateWithoutUserInput
        >
      | WatchlistCreateWithoutUserInput[]
      | WatchlistUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | WatchlistCreateOrConnectWithoutUserInput
      | WatchlistCreateOrConnectWithoutUserInput[];
    upsert?:
      | WatchlistUpsertWithWhereUniqueWithoutUserInput
      | WatchlistUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: WatchlistCreateManyUserInputEnvelope;
    set?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[];
    disconnect?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[];
    delete?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[];
    connect?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[];
    update?:
      | WatchlistUpdateWithWhereUniqueWithoutUserInput
      | WatchlistUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | WatchlistUpdateManyWithWhereWithoutUserInput
      | WatchlistUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: WatchlistScalarWhereInput | WatchlistScalarWhereInput[];
  };

  export type RiskProfileUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<
      RiskProfileCreateWithoutUserInput,
      RiskProfileUncheckedCreateWithoutUserInput
    >;
    connectOrCreate?: RiskProfileCreateOrConnectWithoutUserInput;
    upsert?: RiskProfileUpsertWithoutUserInput;
    disconnect?: RiskProfileWhereInput | boolean;
    delete?: RiskProfileWhereInput | boolean;
    connect?: RiskProfileWhereUniqueInput;
    update?: XOR<
      XOR<
        RiskProfileUpdateToOneWithWhereWithoutUserInput,
        RiskProfileUpdateWithoutUserInput
      >,
      RiskProfileUncheckedUpdateWithoutUserInput
    >;
  };

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          AccountCreateWithoutUserInput,
          AccountUncheckedCreateWithoutUserInput
        >
      | AccountCreateWithoutUserInput[]
      | AccountUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | AccountCreateOrConnectWithoutUserInput
      | AccountCreateOrConnectWithoutUserInput[];
    upsert?:
      | AccountUpsertWithWhereUniqueWithoutUserInput
      | AccountUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: AccountCreateManyUserInputEnvelope;
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[];
    update?:
      | AccountUpdateWithWhereUniqueWithoutUserInput
      | AccountUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | AccountUpdateManyWithWhereWithoutUserInput
      | AccountUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[];
  };

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          SessionCreateWithoutUserInput,
          SessionUncheckedCreateWithoutUserInput
        >
      | SessionCreateWithoutUserInput[]
      | SessionUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | SessionCreateOrConnectWithoutUserInput
      | SessionCreateOrConnectWithoutUserInput[];
    upsert?:
      | SessionUpsertWithWhereUniqueWithoutUserInput
      | SessionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: SessionCreateManyUserInputEnvelope;
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    update?:
      | SessionUpdateWithWhereUniqueWithoutUserInput
      | SessionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | SessionUpdateManyWithWhereWithoutUserInput
      | SessionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[];
  };

  export type PortfolioUncheckedUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          PortfolioCreateWithoutUserInput,
          PortfolioUncheckedCreateWithoutUserInput
        >
      | PortfolioCreateWithoutUserInput[]
      | PortfolioUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | PortfolioCreateOrConnectWithoutUserInput
      | PortfolioCreateOrConnectWithoutUserInput[];
    upsert?:
      | PortfolioUpsertWithWhereUniqueWithoutUserInput
      | PortfolioUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: PortfolioCreateManyUserInputEnvelope;
    set?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[];
    disconnect?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[];
    delete?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[];
    connect?: PortfolioWhereUniqueInput | PortfolioWhereUniqueInput[];
    update?:
      | PortfolioUpdateWithWhereUniqueWithoutUserInput
      | PortfolioUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | PortfolioUpdateManyWithWhereWithoutUserInput
      | PortfolioUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: PortfolioScalarWhereInput | PortfolioScalarWhereInput[];
  };

  export type TransactionUncheckedUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          TransactionCreateWithoutUserInput,
          TransactionUncheckedCreateWithoutUserInput
        >
      | TransactionCreateWithoutUserInput[]
      | TransactionUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | TransactionCreateOrConnectWithoutUserInput
      | TransactionCreateOrConnectWithoutUserInput[];
    upsert?:
      | TransactionUpsertWithWhereUniqueWithoutUserInput
      | TransactionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: TransactionCreateManyUserInputEnvelope;
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[];
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[];
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[];
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[];
    update?:
      | TransactionUpdateWithWhereUniqueWithoutUserInput
      | TransactionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | TransactionUpdateManyWithWhereWithoutUserInput
      | TransactionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[];
  };

  export type WatchlistUncheckedUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<
          WatchlistCreateWithoutUserInput,
          WatchlistUncheckedCreateWithoutUserInput
        >
      | WatchlistCreateWithoutUserInput[]
      | WatchlistUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      | WatchlistCreateOrConnectWithoutUserInput
      | WatchlistCreateOrConnectWithoutUserInput[];
    upsert?:
      | WatchlistUpsertWithWhereUniqueWithoutUserInput
      | WatchlistUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: WatchlistCreateManyUserInputEnvelope;
    set?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[];
    disconnect?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[];
    delete?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[];
    connect?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[];
    update?:
      | WatchlistUpdateWithWhereUniqueWithoutUserInput
      | WatchlistUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      | WatchlistUpdateManyWithWhereWithoutUserInput
      | WatchlistUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: WatchlistScalarWhereInput | WatchlistScalarWhereInput[];
  };

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<
      UserCreateWithoutAccountsInput,
      UserUncheckedCreateWithoutAccountsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput;
    connect?: UserWhereUniqueInput;
  };

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
  };

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<
      UserCreateWithoutAccountsInput,
      UserUncheckedCreateWithoutAccountsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput;
    upsert?: UserUpsertWithoutAccountsInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutAccountsInput,
        UserUpdateWithoutAccountsInput
      >,
      UserUncheckedUpdateWithoutAccountsInput
    >;
  };

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<
      UserCreateWithoutSessionsInput,
      UserUncheckedCreateWithoutSessionsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput;
    connect?: UserWhereUniqueInput;
  };

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<
      UserCreateWithoutSessionsInput,
      UserUncheckedCreateWithoutSessionsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput;
    upsert?: UserUpsertWithoutSessionsInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutSessionsInput,
        UserUpdateWithoutSessionsInput
      >,
      UserUncheckedUpdateWithoutSessionsInput
    >;
  };

  export type NavHistoryCreateNestedManyWithoutFundInput = {
    create?:
      | XOR<
          NavHistoryCreateWithoutFundInput,
          NavHistoryUncheckedCreateWithoutFundInput
        >
      | NavHistoryCreateWithoutFundInput[]
      | NavHistoryUncheckedCreateWithoutFundInput[];
    connectOrCreate?:
      | NavHistoryCreateOrConnectWithoutFundInput
      | NavHistoryCreateOrConnectWithoutFundInput[];
    createMany?: NavHistoryCreateManyFundInputEnvelope;
    connect?: NavHistoryWhereUniqueInput | NavHistoryWhereUniqueInput[];
  };

  export type HoldingCreateNestedManyWithoutFundInput = {
    create?:
      | XOR<
          HoldingCreateWithoutFundInput,
          HoldingUncheckedCreateWithoutFundInput
        >
      | HoldingCreateWithoutFundInput[]
      | HoldingUncheckedCreateWithoutFundInput[];
    connectOrCreate?:
      | HoldingCreateOrConnectWithoutFundInput
      | HoldingCreateOrConnectWithoutFundInput[];
    createMany?: HoldingCreateManyFundInputEnvelope;
    connect?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[];
  };

  export type TransactionCreateNestedManyWithoutFundInput = {
    create?:
      | XOR<
          TransactionCreateWithoutFundInput,
          TransactionUncheckedCreateWithoutFundInput
        >
      | TransactionCreateWithoutFundInput[]
      | TransactionUncheckedCreateWithoutFundInput[];
    connectOrCreate?:
      | TransactionCreateOrConnectWithoutFundInput
      | TransactionCreateOrConnectWithoutFundInput[];
    createMany?: TransactionCreateManyFundInputEnvelope;
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[];
  };

  export type WatchlistCreateNestedManyWithoutFundInput = {
    create?:
      | XOR<
          WatchlistCreateWithoutFundInput,
          WatchlistUncheckedCreateWithoutFundInput
        >
      | WatchlistCreateWithoutFundInput[]
      | WatchlistUncheckedCreateWithoutFundInput[];
    connectOrCreate?:
      | WatchlistCreateOrConnectWithoutFundInput
      | WatchlistCreateOrConnectWithoutFundInput[];
    createMany?: WatchlistCreateManyFundInputEnvelope;
    connect?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[];
  };

  export type NavHistoryUncheckedCreateNestedManyWithoutFundInput = {
    create?:
      | XOR<
          NavHistoryCreateWithoutFundInput,
          NavHistoryUncheckedCreateWithoutFundInput
        >
      | NavHistoryCreateWithoutFundInput[]
      | NavHistoryUncheckedCreateWithoutFundInput[];
    connectOrCreate?:
      | NavHistoryCreateOrConnectWithoutFundInput
      | NavHistoryCreateOrConnectWithoutFundInput[];
    createMany?: NavHistoryCreateManyFundInputEnvelope;
    connect?: NavHistoryWhereUniqueInput | NavHistoryWhereUniqueInput[];
  };

  export type HoldingUncheckedCreateNestedManyWithoutFundInput = {
    create?:
      | XOR<
          HoldingCreateWithoutFundInput,
          HoldingUncheckedCreateWithoutFundInput
        >
      | HoldingCreateWithoutFundInput[]
      | HoldingUncheckedCreateWithoutFundInput[];
    connectOrCreate?:
      | HoldingCreateOrConnectWithoutFundInput
      | HoldingCreateOrConnectWithoutFundInput[];
    createMany?: HoldingCreateManyFundInputEnvelope;
    connect?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[];
  };

  export type TransactionUncheckedCreateNestedManyWithoutFundInput = {
    create?:
      | XOR<
          TransactionCreateWithoutFundInput,
          TransactionUncheckedCreateWithoutFundInput
        >
      | TransactionCreateWithoutFundInput[]
      | TransactionUncheckedCreateWithoutFundInput[];
    connectOrCreate?:
      | TransactionCreateOrConnectWithoutFundInput
      | TransactionCreateOrConnectWithoutFundInput[];
    createMany?: TransactionCreateManyFundInputEnvelope;
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[];
  };

  export type WatchlistUncheckedCreateNestedManyWithoutFundInput = {
    create?:
      | XOR<
          WatchlistCreateWithoutFundInput,
          WatchlistUncheckedCreateWithoutFundInput
        >
      | WatchlistCreateWithoutFundInput[]
      | WatchlistUncheckedCreateWithoutFundInput[];
    connectOrCreate?:
      | WatchlistCreateOrConnectWithoutFundInput
      | WatchlistCreateOrConnectWithoutFundInput[];
    createMany?: WatchlistCreateManyFundInputEnvelope;
    connect?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[];
  };

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string;
    increment?: Decimal | DecimalJsLike | number | string;
    decrement?: Decimal | DecimalJsLike | number | string;
    multiply?: Decimal | DecimalJsLike | number | string;
    divide?: Decimal | DecimalJsLike | number | string;
  };

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null;
    increment?: Decimal | DecimalJsLike | number | string;
    decrement?: Decimal | DecimalJsLike | number | string;
    multiply?: Decimal | DecimalJsLike | number | string;
    divide?: Decimal | DecimalJsLike | number | string;
  };

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
  };

  export type NavHistoryUpdateManyWithoutFundNestedInput = {
    create?:
      | XOR<
          NavHistoryCreateWithoutFundInput,
          NavHistoryUncheckedCreateWithoutFundInput
        >
      | NavHistoryCreateWithoutFundInput[]
      | NavHistoryUncheckedCreateWithoutFundInput[];
    connectOrCreate?:
      | NavHistoryCreateOrConnectWithoutFundInput
      | NavHistoryCreateOrConnectWithoutFundInput[];
    upsert?:
      | NavHistoryUpsertWithWhereUniqueWithoutFundInput
      | NavHistoryUpsertWithWhereUniqueWithoutFundInput[];
    createMany?: NavHistoryCreateManyFundInputEnvelope;
    set?: NavHistoryWhereUniqueInput | NavHistoryWhereUniqueInput[];
    disconnect?: NavHistoryWhereUniqueInput | NavHistoryWhereUniqueInput[];
    delete?: NavHistoryWhereUniqueInput | NavHistoryWhereUniqueInput[];
    connect?: NavHistoryWhereUniqueInput | NavHistoryWhereUniqueInput[];
    update?:
      | NavHistoryUpdateWithWhereUniqueWithoutFundInput
      | NavHistoryUpdateWithWhereUniqueWithoutFundInput[];
    updateMany?:
      | NavHistoryUpdateManyWithWhereWithoutFundInput
      | NavHistoryUpdateManyWithWhereWithoutFundInput[];
    deleteMany?: NavHistoryScalarWhereInput | NavHistoryScalarWhereInput[];
  };

  export type HoldingUpdateManyWithoutFundNestedInput = {
    create?:
      | XOR<
          HoldingCreateWithoutFundInput,
          HoldingUncheckedCreateWithoutFundInput
        >
      | HoldingCreateWithoutFundInput[]
      | HoldingUncheckedCreateWithoutFundInput[];
    connectOrCreate?:
      | HoldingCreateOrConnectWithoutFundInput
      | HoldingCreateOrConnectWithoutFundInput[];
    upsert?:
      | HoldingUpsertWithWhereUniqueWithoutFundInput
      | HoldingUpsertWithWhereUniqueWithoutFundInput[];
    createMany?: HoldingCreateManyFundInputEnvelope;
    set?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[];
    disconnect?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[];
    delete?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[];
    connect?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[];
    update?:
      | HoldingUpdateWithWhereUniqueWithoutFundInput
      | HoldingUpdateWithWhereUniqueWithoutFundInput[];
    updateMany?:
      | HoldingUpdateManyWithWhereWithoutFundInput
      | HoldingUpdateManyWithWhereWithoutFundInput[];
    deleteMany?: HoldingScalarWhereInput | HoldingScalarWhereInput[];
  };

  export type TransactionUpdateManyWithoutFundNestedInput = {
    create?:
      | XOR<
          TransactionCreateWithoutFundInput,
          TransactionUncheckedCreateWithoutFundInput
        >
      | TransactionCreateWithoutFundInput[]
      | TransactionUncheckedCreateWithoutFundInput[];
    connectOrCreate?:
      | TransactionCreateOrConnectWithoutFundInput
      | TransactionCreateOrConnectWithoutFundInput[];
    upsert?:
      | TransactionUpsertWithWhereUniqueWithoutFundInput
      | TransactionUpsertWithWhereUniqueWithoutFundInput[];
    createMany?: TransactionCreateManyFundInputEnvelope;
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[];
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[];
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[];
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[];
    update?:
      | TransactionUpdateWithWhereUniqueWithoutFundInput
      | TransactionUpdateWithWhereUniqueWithoutFundInput[];
    updateMany?:
      | TransactionUpdateManyWithWhereWithoutFundInput
      | TransactionUpdateManyWithWhereWithoutFundInput[];
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[];
  };

  export type WatchlistUpdateManyWithoutFundNestedInput = {
    create?:
      | XOR<
          WatchlistCreateWithoutFundInput,
          WatchlistUncheckedCreateWithoutFundInput
        >
      | WatchlistCreateWithoutFundInput[]
      | WatchlistUncheckedCreateWithoutFundInput[];
    connectOrCreate?:
      | WatchlistCreateOrConnectWithoutFundInput
      | WatchlistCreateOrConnectWithoutFundInput[];
    upsert?:
      | WatchlistUpsertWithWhereUniqueWithoutFundInput
      | WatchlistUpsertWithWhereUniqueWithoutFundInput[];
    createMany?: WatchlistCreateManyFundInputEnvelope;
    set?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[];
    disconnect?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[];
    delete?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[];
    connect?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[];
    update?:
      | WatchlistUpdateWithWhereUniqueWithoutFundInput
      | WatchlistUpdateWithWhereUniqueWithoutFundInput[];
    updateMany?:
      | WatchlistUpdateManyWithWhereWithoutFundInput
      | WatchlistUpdateManyWithWhereWithoutFundInput[];
    deleteMany?: WatchlistScalarWhereInput | WatchlistScalarWhereInput[];
  };

  export type NavHistoryUncheckedUpdateManyWithoutFundNestedInput = {
    create?:
      | XOR<
          NavHistoryCreateWithoutFundInput,
          NavHistoryUncheckedCreateWithoutFundInput
        >
      | NavHistoryCreateWithoutFundInput[]
      | NavHistoryUncheckedCreateWithoutFundInput[];
    connectOrCreate?:
      | NavHistoryCreateOrConnectWithoutFundInput
      | NavHistoryCreateOrConnectWithoutFundInput[];
    upsert?:
      | NavHistoryUpsertWithWhereUniqueWithoutFundInput
      | NavHistoryUpsertWithWhereUniqueWithoutFundInput[];
    createMany?: NavHistoryCreateManyFundInputEnvelope;
    set?: NavHistoryWhereUniqueInput | NavHistoryWhereUniqueInput[];
    disconnect?: NavHistoryWhereUniqueInput | NavHistoryWhereUniqueInput[];
    delete?: NavHistoryWhereUniqueInput | NavHistoryWhereUniqueInput[];
    connect?: NavHistoryWhereUniqueInput | NavHistoryWhereUniqueInput[];
    update?:
      | NavHistoryUpdateWithWhereUniqueWithoutFundInput
      | NavHistoryUpdateWithWhereUniqueWithoutFundInput[];
    updateMany?:
      | NavHistoryUpdateManyWithWhereWithoutFundInput
      | NavHistoryUpdateManyWithWhereWithoutFundInput[];
    deleteMany?: NavHistoryScalarWhereInput | NavHistoryScalarWhereInput[];
  };

  export type HoldingUncheckedUpdateManyWithoutFundNestedInput = {
    create?:
      | XOR<
          HoldingCreateWithoutFundInput,
          HoldingUncheckedCreateWithoutFundInput
        >
      | HoldingCreateWithoutFundInput[]
      | HoldingUncheckedCreateWithoutFundInput[];
    connectOrCreate?:
      | HoldingCreateOrConnectWithoutFundInput
      | HoldingCreateOrConnectWithoutFundInput[];
    upsert?:
      | HoldingUpsertWithWhereUniqueWithoutFundInput
      | HoldingUpsertWithWhereUniqueWithoutFundInput[];
    createMany?: HoldingCreateManyFundInputEnvelope;
    set?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[];
    disconnect?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[];
    delete?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[];
    connect?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[];
    update?:
      | HoldingUpdateWithWhereUniqueWithoutFundInput
      | HoldingUpdateWithWhereUniqueWithoutFundInput[];
    updateMany?:
      | HoldingUpdateManyWithWhereWithoutFundInput
      | HoldingUpdateManyWithWhereWithoutFundInput[];
    deleteMany?: HoldingScalarWhereInput | HoldingScalarWhereInput[];
  };

  export type TransactionUncheckedUpdateManyWithoutFundNestedInput = {
    create?:
      | XOR<
          TransactionCreateWithoutFundInput,
          TransactionUncheckedCreateWithoutFundInput
        >
      | TransactionCreateWithoutFundInput[]
      | TransactionUncheckedCreateWithoutFundInput[];
    connectOrCreate?:
      | TransactionCreateOrConnectWithoutFundInput
      | TransactionCreateOrConnectWithoutFundInput[];
    upsert?:
      | TransactionUpsertWithWhereUniqueWithoutFundInput
      | TransactionUpsertWithWhereUniqueWithoutFundInput[];
    createMany?: TransactionCreateManyFundInputEnvelope;
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[];
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[];
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[];
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[];
    update?:
      | TransactionUpdateWithWhereUniqueWithoutFundInput
      | TransactionUpdateWithWhereUniqueWithoutFundInput[];
    updateMany?:
      | TransactionUpdateManyWithWhereWithoutFundInput
      | TransactionUpdateManyWithWhereWithoutFundInput[];
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[];
  };

  export type WatchlistUncheckedUpdateManyWithoutFundNestedInput = {
    create?:
      | XOR<
          WatchlistCreateWithoutFundInput,
          WatchlistUncheckedCreateWithoutFundInput
        >
      | WatchlistCreateWithoutFundInput[]
      | WatchlistUncheckedCreateWithoutFundInput[];
    connectOrCreate?:
      | WatchlistCreateOrConnectWithoutFundInput
      | WatchlistCreateOrConnectWithoutFundInput[];
    upsert?:
      | WatchlistUpsertWithWhereUniqueWithoutFundInput
      | WatchlistUpsertWithWhereUniqueWithoutFundInput[];
    createMany?: WatchlistCreateManyFundInputEnvelope;
    set?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[];
    disconnect?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[];
    delete?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[];
    connect?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[];
    update?:
      | WatchlistUpdateWithWhereUniqueWithoutFundInput
      | WatchlistUpdateWithWhereUniqueWithoutFundInput[];
    updateMany?:
      | WatchlistUpdateManyWithWhereWithoutFundInput
      | WatchlistUpdateManyWithWhereWithoutFundInput[];
    deleteMany?: WatchlistScalarWhereInput | WatchlistScalarWhereInput[];
  };

  export type FundCreateNestedOneWithoutNavHistoryInput = {
    create?: XOR<
      FundCreateWithoutNavHistoryInput,
      FundUncheckedCreateWithoutNavHistoryInput
    >;
    connectOrCreate?: FundCreateOrConnectWithoutNavHistoryInput;
    connect?: FundWhereUniqueInput;
  };

  export type FundUpdateOneRequiredWithoutNavHistoryNestedInput = {
    create?: XOR<
      FundCreateWithoutNavHistoryInput,
      FundUncheckedCreateWithoutNavHistoryInput
    >;
    connectOrCreate?: FundCreateOrConnectWithoutNavHistoryInput;
    upsert?: FundUpsertWithoutNavHistoryInput;
    connect?: FundWhereUniqueInput;
    update?: XOR<
      XOR<
        FundUpdateToOneWithWhereWithoutNavHistoryInput,
        FundUpdateWithoutNavHistoryInput
      >,
      FundUncheckedUpdateWithoutNavHistoryInput
    >;
  };

  export type UserCreateNestedOneWithoutPortfoliosInput = {
    create?: XOR<
      UserCreateWithoutPortfoliosInput,
      UserUncheckedCreateWithoutPortfoliosInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutPortfoliosInput;
    connect?: UserWhereUniqueInput;
  };

  export type HoldingCreateNestedManyWithoutPortfolioInput = {
    create?:
      | XOR<
          HoldingCreateWithoutPortfolioInput,
          HoldingUncheckedCreateWithoutPortfolioInput
        >
      | HoldingCreateWithoutPortfolioInput[]
      | HoldingUncheckedCreateWithoutPortfolioInput[];
    connectOrCreate?:
      | HoldingCreateOrConnectWithoutPortfolioInput
      | HoldingCreateOrConnectWithoutPortfolioInput[];
    createMany?: HoldingCreateManyPortfolioInputEnvelope;
    connect?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[];
  };

  export type HoldingUncheckedCreateNestedManyWithoutPortfolioInput = {
    create?:
      | XOR<
          HoldingCreateWithoutPortfolioInput,
          HoldingUncheckedCreateWithoutPortfolioInput
        >
      | HoldingCreateWithoutPortfolioInput[]
      | HoldingUncheckedCreateWithoutPortfolioInput[];
    connectOrCreate?:
      | HoldingCreateOrConnectWithoutPortfolioInput
      | HoldingCreateOrConnectWithoutPortfolioInput[];
    createMany?: HoldingCreateManyPortfolioInputEnvelope;
    connect?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[];
  };

  export type UserUpdateOneRequiredWithoutPortfoliosNestedInput = {
    create?: XOR<
      UserCreateWithoutPortfoliosInput,
      UserUncheckedCreateWithoutPortfoliosInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutPortfoliosInput;
    upsert?: UserUpsertWithoutPortfoliosInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutPortfoliosInput,
        UserUpdateWithoutPortfoliosInput
      >,
      UserUncheckedUpdateWithoutPortfoliosInput
    >;
  };

  export type HoldingUpdateManyWithoutPortfolioNestedInput = {
    create?:
      | XOR<
          HoldingCreateWithoutPortfolioInput,
          HoldingUncheckedCreateWithoutPortfolioInput
        >
      | HoldingCreateWithoutPortfolioInput[]
      | HoldingUncheckedCreateWithoutPortfolioInput[];
    connectOrCreate?:
      | HoldingCreateOrConnectWithoutPortfolioInput
      | HoldingCreateOrConnectWithoutPortfolioInput[];
    upsert?:
      | HoldingUpsertWithWhereUniqueWithoutPortfolioInput
      | HoldingUpsertWithWhereUniqueWithoutPortfolioInput[];
    createMany?: HoldingCreateManyPortfolioInputEnvelope;
    set?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[];
    disconnect?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[];
    delete?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[];
    connect?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[];
    update?:
      | HoldingUpdateWithWhereUniqueWithoutPortfolioInput
      | HoldingUpdateWithWhereUniqueWithoutPortfolioInput[];
    updateMany?:
      | HoldingUpdateManyWithWhereWithoutPortfolioInput
      | HoldingUpdateManyWithWhereWithoutPortfolioInput[];
    deleteMany?: HoldingScalarWhereInput | HoldingScalarWhereInput[];
  };

  export type HoldingUncheckedUpdateManyWithoutPortfolioNestedInput = {
    create?:
      | XOR<
          HoldingCreateWithoutPortfolioInput,
          HoldingUncheckedCreateWithoutPortfolioInput
        >
      | HoldingCreateWithoutPortfolioInput[]
      | HoldingUncheckedCreateWithoutPortfolioInput[];
    connectOrCreate?:
      | HoldingCreateOrConnectWithoutPortfolioInput
      | HoldingCreateOrConnectWithoutPortfolioInput[];
    upsert?:
      | HoldingUpsertWithWhereUniqueWithoutPortfolioInput
      | HoldingUpsertWithWhereUniqueWithoutPortfolioInput[];
    createMany?: HoldingCreateManyPortfolioInputEnvelope;
    set?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[];
    disconnect?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[];
    delete?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[];
    connect?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[];
    update?:
      | HoldingUpdateWithWhereUniqueWithoutPortfolioInput
      | HoldingUpdateWithWhereUniqueWithoutPortfolioInput[];
    updateMany?:
      | HoldingUpdateManyWithWhereWithoutPortfolioInput
      | HoldingUpdateManyWithWhereWithoutPortfolioInput[];
    deleteMany?: HoldingScalarWhereInput | HoldingScalarWhereInput[];
  };

  export type PortfolioCreateNestedOneWithoutHoldingsInput = {
    create?: XOR<
      PortfolioCreateWithoutHoldingsInput,
      PortfolioUncheckedCreateWithoutHoldingsInput
    >;
    connectOrCreate?: PortfolioCreateOrConnectWithoutHoldingsInput;
    connect?: PortfolioWhereUniqueInput;
  };

  export type FundCreateNestedOneWithoutHoldingsInput = {
    create?: XOR<
      FundCreateWithoutHoldingsInput,
      FundUncheckedCreateWithoutHoldingsInput
    >;
    connectOrCreate?: FundCreateOrConnectWithoutHoldingsInput;
    connect?: FundWhereUniqueInput;
  };

  export type PortfolioUpdateOneRequiredWithoutHoldingsNestedInput = {
    create?: XOR<
      PortfolioCreateWithoutHoldingsInput,
      PortfolioUncheckedCreateWithoutHoldingsInput
    >;
    connectOrCreate?: PortfolioCreateOrConnectWithoutHoldingsInput;
    upsert?: PortfolioUpsertWithoutHoldingsInput;
    connect?: PortfolioWhereUniqueInput;
    update?: XOR<
      XOR<
        PortfolioUpdateToOneWithWhereWithoutHoldingsInput,
        PortfolioUpdateWithoutHoldingsInput
      >,
      PortfolioUncheckedUpdateWithoutHoldingsInput
    >;
  };

  export type FundUpdateOneRequiredWithoutHoldingsNestedInput = {
    create?: XOR<
      FundCreateWithoutHoldingsInput,
      FundUncheckedCreateWithoutHoldingsInput
    >;
    connectOrCreate?: FundCreateOrConnectWithoutHoldingsInput;
    upsert?: FundUpsertWithoutHoldingsInput;
    connect?: FundWhereUniqueInput;
    update?: XOR<
      XOR<
        FundUpdateToOneWithWhereWithoutHoldingsInput,
        FundUpdateWithoutHoldingsInput
      >,
      FundUncheckedUpdateWithoutHoldingsInput
    >;
  };

  export type UserCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<
      UserCreateWithoutTransactionsInput,
      UserUncheckedCreateWithoutTransactionsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutTransactionsInput;
    connect?: UserWhereUniqueInput;
  };

  export type FundCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<
      FundCreateWithoutTransactionsInput,
      FundUncheckedCreateWithoutTransactionsInput
    >;
    connectOrCreate?: FundCreateOrConnectWithoutTransactionsInput;
    connect?: FundWhereUniqueInput;
  };

  export type EnumTransactionTypeFieldUpdateOperationsInput = {
    set?: $Enums.TransactionType;
  };

  export type EnumTransactionStatusFieldUpdateOperationsInput = {
    set?: $Enums.TransactionStatus;
  };

  export type UserUpdateOneRequiredWithoutTransactionsNestedInput = {
    create?: XOR<
      UserCreateWithoutTransactionsInput,
      UserUncheckedCreateWithoutTransactionsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutTransactionsInput;
    upsert?: UserUpsertWithoutTransactionsInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutTransactionsInput,
        UserUpdateWithoutTransactionsInput
      >,
      UserUncheckedUpdateWithoutTransactionsInput
    >;
  };

  export type FundUpdateOneRequiredWithoutTransactionsNestedInput = {
    create?: XOR<
      FundCreateWithoutTransactionsInput,
      FundUncheckedCreateWithoutTransactionsInput
    >;
    connectOrCreate?: FundCreateOrConnectWithoutTransactionsInput;
    upsert?: FundUpsertWithoutTransactionsInput;
    connect?: FundWhereUniqueInput;
    update?: XOR<
      XOR<
        FundUpdateToOneWithWhereWithoutTransactionsInput,
        FundUpdateWithoutTransactionsInput
      >,
      FundUncheckedUpdateWithoutTransactionsInput
    >;
  };

  export type UserCreateNestedOneWithoutWatchlistInput = {
    create?: XOR<
      UserCreateWithoutWatchlistInput,
      UserUncheckedCreateWithoutWatchlistInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutWatchlistInput;
    connect?: UserWhereUniqueInput;
  };

  export type FundCreateNestedOneWithoutWatchlistInput = {
    create?: XOR<
      FundCreateWithoutWatchlistInput,
      FundUncheckedCreateWithoutWatchlistInput
    >;
    connectOrCreate?: FundCreateOrConnectWithoutWatchlistInput;
    connect?: FundWhereUniqueInput;
  };

  export type UserUpdateOneRequiredWithoutWatchlistNestedInput = {
    create?: XOR<
      UserCreateWithoutWatchlistInput,
      UserUncheckedCreateWithoutWatchlistInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutWatchlistInput;
    upsert?: UserUpsertWithoutWatchlistInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutWatchlistInput,
        UserUpdateWithoutWatchlistInput
      >,
      UserUncheckedUpdateWithoutWatchlistInput
    >;
  };

  export type FundUpdateOneRequiredWithoutWatchlistNestedInput = {
    create?: XOR<
      FundCreateWithoutWatchlistInput,
      FundUncheckedCreateWithoutWatchlistInput
    >;
    connectOrCreate?: FundCreateOrConnectWithoutWatchlistInput;
    upsert?: FundUpsertWithoutWatchlistInput;
    connect?: FundWhereUniqueInput;
    update?: XOR<
      XOR<
        FundUpdateToOneWithWhereWithoutWatchlistInput,
        FundUpdateWithoutWatchlistInput
      >,
      FundUncheckedUpdateWithoutWatchlistInput
    >;
  };

  export type UserCreateNestedOneWithoutRiskProfileInput = {
    create?: XOR<
      UserCreateWithoutRiskProfileInput,
      UserUncheckedCreateWithoutRiskProfileInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutRiskProfileInput;
    connect?: UserWhereUniqueInput;
  };

  export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
  };

  export type EnumRiskCategoryFieldUpdateOperationsInput = {
    set?: $Enums.RiskCategory;
  };

  export type UserUpdateOneRequiredWithoutRiskProfileNestedInput = {
    create?: XOR<
      UserCreateWithoutRiskProfileInput,
      UserUncheckedCreateWithoutRiskProfileInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutRiskProfileInput;
    upsert?: UserUpsertWithoutRiskProfileInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutRiskProfileInput,
        UserUpdateWithoutRiskProfileInput
      >,
      UserUncheckedUpdateWithoutRiskProfileInput
    >;
  };

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringFilter<$PrismaModel> | string;
  };

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringNullableFilter<$PrismaModel> | string | null;
  };

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
  };

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>;
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole;
  };

  export type NestedEnumKycStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.KycStatus | EnumKycStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.KycStatus[] | ListEnumKycStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.KycStatus[] | ListEnumKycStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumKycStatusFilter<$PrismaModel> | $Enums.KycStatus;
  };

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  };

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntFilter<$PrismaModel> | number;
  };

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?:
      | NestedStringNullableWithAggregatesFilter<$PrismaModel>
      | string
      | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  };

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableFilter<$PrismaModel> | number | null;
  };

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> =
    {
      equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
      in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
      notIn?:
        | Date[]
        | string[]
        | ListDateTimeFieldRefInput<$PrismaModel>
        | null;
      lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
      lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
      gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
      gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
      not?:
        | NestedDateTimeNullableWithAggregatesFilter<$PrismaModel>
        | Date
        | string
        | null;
      _count?: NestedIntNullableFilter<$PrismaModel>;
      _min?: NestedDateTimeNullableFilter<$PrismaModel>;
      _max?: NestedDateTimeNullableFilter<$PrismaModel>;
    };

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumUserRoleWithAggregatesFilter<$PrismaModel>
      | $Enums.UserRole;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumUserRoleFilter<$PrismaModel>;
    _max?: NestedEnumUserRoleFilter<$PrismaModel>;
  };

  export type NestedEnumKycStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.KycStatus | EnumKycStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.KycStatus[] | ListEnumKycStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.KycStatus[] | ListEnumKycStatusFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumKycStatusWithAggregatesFilter<$PrismaModel>
      | $Enums.KycStatus;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumKycStatusFilter<$PrismaModel>;
    _max?: NestedEnumKycStatusFilter<$PrismaModel>;
  };

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _avg?: NestedFloatNullableFilter<$PrismaModel>;
    _sum?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedIntNullableFilter<$PrismaModel>;
    _max?: NestedIntNullableFilter<$PrismaModel>;
  };

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null;
  };

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    in?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>;
    notIn?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>;
    lt?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    lte?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    gt?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    gte?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    not?:
      | NestedDecimalFilter<$PrismaModel>
      | Decimal
      | DecimalJsLike
      | number
      | string;
  };

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>
      | null;
    in?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>
      | null;
    notIn?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>
      | null;
    lt?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    lte?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    gt?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    gte?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    not?:
      | NestedDecimalNullableFilter<$PrismaModel>
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
  };

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolFilter<$PrismaModel> | boolean;
  };

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    in?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>;
    notIn?:
      | Decimal[]
      | DecimalJsLike[]
      | number[]
      | string[]
      | ListDecimalFieldRefInput<$PrismaModel>;
    lt?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    lte?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    gt?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    gte?:
      | Decimal
      | DecimalJsLike
      | number
      | string
      | DecimalFieldRefInput<$PrismaModel>;
    not?:
      | NestedDecimalWithAggregatesFilter<$PrismaModel>
      | Decimal
      | DecimalJsLike
      | number
      | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedDecimalFilter<$PrismaModel>;
    _sum?: NestedDecimalFilter<$PrismaModel>;
    _min?: NestedDecimalFilter<$PrismaModel>;
    _max?: NestedDecimalFilter<$PrismaModel>;
  };

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> =
    {
      equals?:
        | Decimal
        | DecimalJsLike
        | number
        | string
        | DecimalFieldRefInput<$PrismaModel>
        | null;
      in?:
        | Decimal[]
        | DecimalJsLike[]
        | number[]
        | string[]
        | ListDecimalFieldRefInput<$PrismaModel>
        | null;
      notIn?:
        | Decimal[]
        | DecimalJsLike[]
        | number[]
        | string[]
        | ListDecimalFieldRefInput<$PrismaModel>
        | null;
      lt?:
        | Decimal
        | DecimalJsLike
        | number
        | string
        | DecimalFieldRefInput<$PrismaModel>;
      lte?:
        | Decimal
        | DecimalJsLike
        | number
        | string
        | DecimalFieldRefInput<$PrismaModel>;
      gt?:
        | Decimal
        | DecimalJsLike
        | number
        | string
        | DecimalFieldRefInput<$PrismaModel>;
      gte?:
        | Decimal
        | DecimalJsLike
        | number
        | string
        | DecimalFieldRefInput<$PrismaModel>;
      not?:
        | NestedDecimalNullableWithAggregatesFilter<$PrismaModel>
        | Decimal
        | DecimalJsLike
        | number
        | string
        | null;
      _count?: NestedIntNullableFilter<$PrismaModel>;
      _avg?: NestedDecimalNullableFilter<$PrismaModel>;
      _sum?: NestedDecimalNullableFilter<$PrismaModel>;
      _min?: NestedDecimalNullableFilter<$PrismaModel>;
      _max?: NestedDecimalNullableFilter<$PrismaModel>;
    };

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedBoolFilter<$PrismaModel>;
    _max?: NestedBoolFilter<$PrismaModel>;
  };

  export type NestedEnumTransactionTypeFilter<$PrismaModel = never> = {
    equals?:
      | $Enums.TransactionType
      | EnumTransactionTypeFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.TransactionType[]
      | ListEnumTransactionTypeFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.TransactionType[]
      | ListEnumTransactionTypeFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumTransactionTypeFilter<$PrismaModel>
      | $Enums.TransactionType;
  };

  export type NestedEnumTransactionStatusFilter<$PrismaModel = never> = {
    equals?:
      | $Enums.TransactionStatus
      | EnumTransactionStatusFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.TransactionStatus[]
      | ListEnumTransactionStatusFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.TransactionStatus[]
      | ListEnumTransactionStatusFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumTransactionStatusFilter<$PrismaModel>
      | $Enums.TransactionStatus;
  };

  export type NestedEnumTransactionTypeWithAggregatesFilter<
    $PrismaModel = never,
  > = {
    equals?:
      | $Enums.TransactionType
      | EnumTransactionTypeFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.TransactionType[]
      | ListEnumTransactionTypeFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.TransactionType[]
      | ListEnumTransactionTypeFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumTransactionTypeWithAggregatesFilter<$PrismaModel>
      | $Enums.TransactionType;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumTransactionTypeFilter<$PrismaModel>;
    _max?: NestedEnumTransactionTypeFilter<$PrismaModel>;
  };

  export type NestedEnumTransactionStatusWithAggregatesFilter<
    $PrismaModel = never,
  > = {
    equals?:
      | $Enums.TransactionStatus
      | EnumTransactionStatusFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.TransactionStatus[]
      | ListEnumTransactionStatusFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.TransactionStatus[]
      | ListEnumTransactionStatusFieldRefInput<$PrismaModel>;
    not?:
      | NestedEnumTransactionStatusWithAggregatesFilter<$PrismaModel>
      | $Enums.TransactionStatus;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumTransactionStatusFilter<$PrismaModel>;
    _max?: NestedEnumTransactionStatusFilter<$PrismaModel>;
  };

  export type NestedEnumRiskCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.RiskCategory | EnumRiskCategoryFieldRefInput<$PrismaModel>;
    in?:
      | $Enums.RiskCategory[]
      | ListEnumRiskCategoryFieldRefInput<$PrismaModel>;
    notIn?:
      | $Enums.RiskCategory[]
      | ListEnumRiskCategoryFieldRefInput<$PrismaModel>;
    not?: NestedEnumRiskCategoryFilter<$PrismaModel> | $Enums.RiskCategory;
  };

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedIntFilter<$PrismaModel>;
    _min?: NestedIntFilter<$PrismaModel>;
    _max?: NestedIntFilter<$PrismaModel>;
  };

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatFilter<$PrismaModel> | number;
  };

  export type NestedEnumRiskCategoryWithAggregatesFilter<$PrismaModel = never> =
    {
      equals?:
        | $Enums.RiskCategory
        | EnumRiskCategoryFieldRefInput<$PrismaModel>;
      in?:
        | $Enums.RiskCategory[]
        | ListEnumRiskCategoryFieldRefInput<$PrismaModel>;
      notIn?:
        | $Enums.RiskCategory[]
        | ListEnumRiskCategoryFieldRefInput<$PrismaModel>;
      not?:
        | NestedEnumRiskCategoryWithAggregatesFilter<$PrismaModel>
        | $Enums.RiskCategory;
      _count?: NestedIntFilter<$PrismaModel>;
      _min?: NestedEnumRiskCategoryFilter<$PrismaModel>;
      _max?: NestedEnumRiskCategoryFilter<$PrismaModel>;
    };
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<NestedJsonFilterBase<$PrismaModel>>,
          Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>
        >,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>;

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?:
      | InputJsonValue
      | JsonFieldRefInput<$PrismaModel>
      | JsonNullValueFilter;
    path?: string[];
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    not?:
      | InputJsonValue
      | JsonFieldRefInput<$PrismaModel>
      | JsonNullValueFilter;
  };

  export type RiskProfileCreateWithoutUserInput = {
    id?: string;
    score: number;
    category: $Enums.RiskCategory;
    answers: JsonNullValueInput | InputJsonValue;
    completedAt: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type RiskProfileUncheckedCreateWithoutUserInput = {
    id?: string;
    score: number;
    category: $Enums.RiskCategory;
    answers: JsonNullValueInput | InputJsonValue;
    completedAt: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type RiskProfileCreateOrConnectWithoutUserInput = {
    where: RiskProfileWhereUniqueInput;
    create: XOR<
      RiskProfileCreateWithoutUserInput,
      RiskProfileUncheckedCreateWithoutUserInput
    >;
  };

  export type AccountCreateWithoutUserInput = {
    id?: string;
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token?: string | null;
    access_token?: string | null;
    expires_at?: number | null;
    token_type?: string | null;
    scope?: string | null;
    id_token?: string | null;
    session_state?: string | null;
  };

  export type AccountUncheckedCreateWithoutUserInput = {
    id?: string;
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token?: string | null;
    access_token?: string | null;
    expires_at?: number | null;
    token_type?: string | null;
    scope?: string | null;
    id_token?: string | null;
    session_state?: string | null;
  };

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput;
    create: XOR<
      AccountCreateWithoutUserInput,
      AccountUncheckedCreateWithoutUserInput
    >;
  };

  export type AccountCreateManyUserInputEnvelope = {
    data: AccountCreateManyUserInput | AccountCreateManyUserInput[];
    skipDuplicates?: boolean;
  };

  export type SessionCreateWithoutUserInput = {
    id?: string;
    sessionToken: string;
    expires: Date | string;
  };

  export type SessionUncheckedCreateWithoutUserInput = {
    id?: string;
    sessionToken: string;
    expires: Date | string;
  };

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput;
    create: XOR<
      SessionCreateWithoutUserInput,
      SessionUncheckedCreateWithoutUserInput
    >;
  };

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[];
    skipDuplicates?: boolean;
  };

  export type PortfolioCreateWithoutUserInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    holdings?: HoldingCreateNestedManyWithoutPortfolioInput;
  };

  export type PortfolioUncheckedCreateWithoutUserInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    holdings?: HoldingUncheckedCreateNestedManyWithoutPortfolioInput;
  };

  export type PortfolioCreateOrConnectWithoutUserInput = {
    where: PortfolioWhereUniqueInput;
    create: XOR<
      PortfolioCreateWithoutUserInput,
      PortfolioUncheckedCreateWithoutUserInput
    >;
  };

  export type PortfolioCreateManyUserInputEnvelope = {
    data: PortfolioCreateManyUserInput | PortfolioCreateManyUserInput[];
    skipDuplicates?: boolean;
  };

  export type TransactionCreateWithoutUserInput = {
    id?: string;
    type: $Enums.TransactionType;
    amount: Decimal | DecimalJsLike | number | string;
    units: Decimal | DecimalJsLike | number | string;
    nav: Decimal | DecimalJsLike | number | string;
    date: Date | string;
    status?: $Enums.TransactionStatus;
    createdAt?: Date | string;
    fund: FundCreateNestedOneWithoutTransactionsInput;
  };

  export type TransactionUncheckedCreateWithoutUserInput = {
    id?: string;
    fundId: string;
    type: $Enums.TransactionType;
    amount: Decimal | DecimalJsLike | number | string;
    units: Decimal | DecimalJsLike | number | string;
    nav: Decimal | DecimalJsLike | number | string;
    date: Date | string;
    status?: $Enums.TransactionStatus;
    createdAt?: Date | string;
  };

  export type TransactionCreateOrConnectWithoutUserInput = {
    where: TransactionWhereUniqueInput;
    create: XOR<
      TransactionCreateWithoutUserInput,
      TransactionUncheckedCreateWithoutUserInput
    >;
  };

  export type TransactionCreateManyUserInputEnvelope = {
    data: TransactionCreateManyUserInput | TransactionCreateManyUserInput[];
    skipDuplicates?: boolean;
  };

  export type WatchlistCreateWithoutUserInput = {
    id?: string;
    addedAt?: Date | string;
    createdAt?: Date | string;
    fund: FundCreateNestedOneWithoutWatchlistInput;
  };

  export type WatchlistUncheckedCreateWithoutUserInput = {
    id?: string;
    fundId: string;
    addedAt?: Date | string;
    createdAt?: Date | string;
  };

  export type WatchlistCreateOrConnectWithoutUserInput = {
    where: WatchlistWhereUniqueInput;
    create: XOR<
      WatchlistCreateWithoutUserInput,
      WatchlistUncheckedCreateWithoutUserInput
    >;
  };

  export type WatchlistCreateManyUserInputEnvelope = {
    data: WatchlistCreateManyUserInput | WatchlistCreateManyUserInput[];
    skipDuplicates?: boolean;
  };

  export type RiskProfileUpsertWithoutUserInput = {
    update: XOR<
      RiskProfileUpdateWithoutUserInput,
      RiskProfileUncheckedUpdateWithoutUserInput
    >;
    create: XOR<
      RiskProfileCreateWithoutUserInput,
      RiskProfileUncheckedCreateWithoutUserInput
    >;
    where?: RiskProfileWhereInput;
  };

  export type RiskProfileUpdateToOneWithWhereWithoutUserInput = {
    where?: RiskProfileWhereInput;
    data: XOR<
      RiskProfileUpdateWithoutUserInput,
      RiskProfileUncheckedUpdateWithoutUserInput
    >;
  };

  export type RiskProfileUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    score?: IntFieldUpdateOperationsInput | number;
    category?: EnumRiskCategoryFieldUpdateOperationsInput | $Enums.RiskCategory;
    answers?: JsonNullValueInput | InputJsonValue;
    completedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type RiskProfileUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    score?: IntFieldUpdateOperationsInput | number;
    category?: EnumRiskCategoryFieldUpdateOperationsInput | $Enums.RiskCategory;
    answers?: JsonNullValueInput | InputJsonValue;
    completedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput;
    update: XOR<
      AccountUpdateWithoutUserInput,
      AccountUncheckedUpdateWithoutUserInput
    >;
    create: XOR<
      AccountCreateWithoutUserInput,
      AccountUncheckedCreateWithoutUserInput
    >;
  };

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput;
    data: XOR<
      AccountUpdateWithoutUserInput,
      AccountUncheckedUpdateWithoutUserInput
    >;
  };

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput;
    data: XOR<
      AccountUpdateManyMutationInput,
      AccountUncheckedUpdateManyWithoutUserInput
    >;
  };

  export type AccountScalarWhereInput = {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[];
    OR?: AccountScalarWhereInput[];
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[];
    id?: StringFilter<'Account'> | string;
    userId?: StringFilter<'Account'> | string;
    type?: StringFilter<'Account'> | string;
    provider?: StringFilter<'Account'> | string;
    providerAccountId?: StringFilter<'Account'> | string;
    refresh_token?: StringNullableFilter<'Account'> | string | null;
    access_token?: StringNullableFilter<'Account'> | string | null;
    expires_at?: IntNullableFilter<'Account'> | number | null;
    token_type?: StringNullableFilter<'Account'> | string | null;
    scope?: StringNullableFilter<'Account'> | string | null;
    id_token?: StringNullableFilter<'Account'> | string | null;
    session_state?: StringNullableFilter<'Account'> | string | null;
  };

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput;
    update: XOR<
      SessionUpdateWithoutUserInput,
      SessionUncheckedUpdateWithoutUserInput
    >;
    create: XOR<
      SessionCreateWithoutUserInput,
      SessionUncheckedCreateWithoutUserInput
    >;
  };

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput;
    data: XOR<
      SessionUpdateWithoutUserInput,
      SessionUncheckedUpdateWithoutUserInput
    >;
  };

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput;
    data: XOR<
      SessionUpdateManyMutationInput,
      SessionUncheckedUpdateManyWithoutUserInput
    >;
  };

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[];
    OR?: SessionScalarWhereInput[];
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[];
    id?: StringFilter<'Session'> | string;
    sessionToken?: StringFilter<'Session'> | string;
    userId?: StringFilter<'Session'> | string;
    expires?: DateTimeFilter<'Session'> | Date | string;
  };

  export type PortfolioUpsertWithWhereUniqueWithoutUserInput = {
    where: PortfolioWhereUniqueInput;
    update: XOR<
      PortfolioUpdateWithoutUserInput,
      PortfolioUncheckedUpdateWithoutUserInput
    >;
    create: XOR<
      PortfolioCreateWithoutUserInput,
      PortfolioUncheckedCreateWithoutUserInput
    >;
  };

  export type PortfolioUpdateWithWhereUniqueWithoutUserInput = {
    where: PortfolioWhereUniqueInput;
    data: XOR<
      PortfolioUpdateWithoutUserInput,
      PortfolioUncheckedUpdateWithoutUserInput
    >;
  };

  export type PortfolioUpdateManyWithWhereWithoutUserInput = {
    where: PortfolioScalarWhereInput;
    data: XOR<
      PortfolioUpdateManyMutationInput,
      PortfolioUncheckedUpdateManyWithoutUserInput
    >;
  };

  export type PortfolioScalarWhereInput = {
    AND?: PortfolioScalarWhereInput | PortfolioScalarWhereInput[];
    OR?: PortfolioScalarWhereInput[];
    NOT?: PortfolioScalarWhereInput | PortfolioScalarWhereInput[];
    id?: StringFilter<'Portfolio'> | string;
    userId?: StringFilter<'Portfolio'> | string;
    name?: StringFilter<'Portfolio'> | string;
    createdAt?: DateTimeFilter<'Portfolio'> | Date | string;
    updatedAt?: DateTimeFilter<'Portfolio'> | Date | string;
  };

  export type TransactionUpsertWithWhereUniqueWithoutUserInput = {
    where: TransactionWhereUniqueInput;
    update: XOR<
      TransactionUpdateWithoutUserInput,
      TransactionUncheckedUpdateWithoutUserInput
    >;
    create: XOR<
      TransactionCreateWithoutUserInput,
      TransactionUncheckedCreateWithoutUserInput
    >;
  };

  export type TransactionUpdateWithWhereUniqueWithoutUserInput = {
    where: TransactionWhereUniqueInput;
    data: XOR<
      TransactionUpdateWithoutUserInput,
      TransactionUncheckedUpdateWithoutUserInput
    >;
  };

  export type TransactionUpdateManyWithWhereWithoutUserInput = {
    where: TransactionScalarWhereInput;
    data: XOR<
      TransactionUpdateManyMutationInput,
      TransactionUncheckedUpdateManyWithoutUserInput
    >;
  };

  export type TransactionScalarWhereInput = {
    AND?: TransactionScalarWhereInput | TransactionScalarWhereInput[];
    OR?: TransactionScalarWhereInput[];
    NOT?: TransactionScalarWhereInput | TransactionScalarWhereInput[];
    id?: StringFilter<'Transaction'> | string;
    userId?: StringFilter<'Transaction'> | string;
    fundId?: StringFilter<'Transaction'> | string;
    type?: EnumTransactionTypeFilter<'Transaction'> | $Enums.TransactionType;
    amount?:
      | DecimalFilter<'Transaction'>
      | Decimal
      | DecimalJsLike
      | number
      | string;
    units?:
      | DecimalFilter<'Transaction'>
      | Decimal
      | DecimalJsLike
      | number
      | string;
    nav?:
      | DecimalFilter<'Transaction'>
      | Decimal
      | DecimalJsLike
      | number
      | string;
    date?: DateTimeFilter<'Transaction'> | Date | string;
    status?:
      | EnumTransactionStatusFilter<'Transaction'>
      | $Enums.TransactionStatus;
    createdAt?: DateTimeFilter<'Transaction'> | Date | string;
  };

  export type WatchlistUpsertWithWhereUniqueWithoutUserInput = {
    where: WatchlistWhereUniqueInput;
    update: XOR<
      WatchlistUpdateWithoutUserInput,
      WatchlistUncheckedUpdateWithoutUserInput
    >;
    create: XOR<
      WatchlistCreateWithoutUserInput,
      WatchlistUncheckedCreateWithoutUserInput
    >;
  };

  export type WatchlistUpdateWithWhereUniqueWithoutUserInput = {
    where: WatchlistWhereUniqueInput;
    data: XOR<
      WatchlistUpdateWithoutUserInput,
      WatchlistUncheckedUpdateWithoutUserInput
    >;
  };

  export type WatchlistUpdateManyWithWhereWithoutUserInput = {
    where: WatchlistScalarWhereInput;
    data: XOR<
      WatchlistUpdateManyMutationInput,
      WatchlistUncheckedUpdateManyWithoutUserInput
    >;
  };

  export type WatchlistScalarWhereInput = {
    AND?: WatchlistScalarWhereInput | WatchlistScalarWhereInput[];
    OR?: WatchlistScalarWhereInput[];
    NOT?: WatchlistScalarWhereInput | WatchlistScalarWhereInput[];
    id?: StringFilter<'Watchlist'> | string;
    userId?: StringFilter<'Watchlist'> | string;
    fundId?: StringFilter<'Watchlist'> | string;
    addedAt?: DateTimeFilter<'Watchlist'> | Date | string;
    createdAt?: DateTimeFilter<'Watchlist'> | Date | string;
  };

  export type UserCreateWithoutAccountsInput = {
    id?: string;
    name?: string | null;
    email: string;
    emailVerified?: Date | string | null;
    password?: string | null;
    image?: string | null;
    role?: $Enums.UserRole;
    kycStatus?: $Enums.KycStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    riskProfile?: RiskProfileCreateNestedOneWithoutUserInput;
    sessions?: SessionCreateNestedManyWithoutUserInput;
    portfolios?: PortfolioCreateNestedManyWithoutUserInput;
    transactions?: TransactionCreateNestedManyWithoutUserInput;
    watchlist?: WatchlistCreateNestedManyWithoutUserInput;
  };

  export type UserUncheckedCreateWithoutAccountsInput = {
    id?: string;
    name?: string | null;
    email: string;
    emailVerified?: Date | string | null;
    password?: string | null;
    image?: string | null;
    role?: $Enums.UserRole;
    kycStatus?: $Enums.KycStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    riskProfile?: RiskProfileUncheckedCreateNestedOneWithoutUserInput;
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput;
    portfolios?: PortfolioUncheckedCreateNestedManyWithoutUserInput;
    transactions?: TransactionUncheckedCreateNestedManyWithoutUserInput;
    watchlist?: WatchlistUncheckedCreateNestedManyWithoutUserInput;
  };

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutAccountsInput,
      UserUncheckedCreateWithoutAccountsInput
    >;
  };

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<
      UserUpdateWithoutAccountsInput,
      UserUncheckedUpdateWithoutAccountsInput
    >;
    create: XOR<
      UserCreateWithoutAccountsInput,
      UserUncheckedCreateWithoutAccountsInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutAccountsInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutAccountsInput,
      UserUncheckedUpdateWithoutAccountsInput
    >;
  };

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: StringFieldUpdateOperationsInput | string;
    emailVerified?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    password?: NullableStringFieldUpdateOperationsInput | string | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    kycStatus?: EnumKycStatusFieldUpdateOperationsInput | $Enums.KycStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    riskProfile?: RiskProfileUpdateOneWithoutUserNestedInput;
    sessions?: SessionUpdateManyWithoutUserNestedInput;
    portfolios?: PortfolioUpdateManyWithoutUserNestedInput;
    transactions?: TransactionUpdateManyWithoutUserNestedInput;
    watchlist?: WatchlistUpdateManyWithoutUserNestedInput;
  };

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: StringFieldUpdateOperationsInput | string;
    emailVerified?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    password?: NullableStringFieldUpdateOperationsInput | string | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    kycStatus?: EnumKycStatusFieldUpdateOperationsInput | $Enums.KycStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    riskProfile?: RiskProfileUncheckedUpdateOneWithoutUserNestedInput;
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput;
    portfolios?: PortfolioUncheckedUpdateManyWithoutUserNestedInput;
    transactions?: TransactionUncheckedUpdateManyWithoutUserNestedInput;
    watchlist?: WatchlistUncheckedUpdateManyWithoutUserNestedInput;
  };

  export type UserCreateWithoutSessionsInput = {
    id?: string;
    name?: string | null;
    email: string;
    emailVerified?: Date | string | null;
    password?: string | null;
    image?: string | null;
    role?: $Enums.UserRole;
    kycStatus?: $Enums.KycStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    riskProfile?: RiskProfileCreateNestedOneWithoutUserInput;
    accounts?: AccountCreateNestedManyWithoutUserInput;
    portfolios?: PortfolioCreateNestedManyWithoutUserInput;
    transactions?: TransactionCreateNestedManyWithoutUserInput;
    watchlist?: WatchlistCreateNestedManyWithoutUserInput;
  };

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string;
    name?: string | null;
    email: string;
    emailVerified?: Date | string | null;
    password?: string | null;
    image?: string | null;
    role?: $Enums.UserRole;
    kycStatus?: $Enums.KycStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    riskProfile?: RiskProfileUncheckedCreateNestedOneWithoutUserInput;
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput;
    portfolios?: PortfolioUncheckedCreateNestedManyWithoutUserInput;
    transactions?: TransactionUncheckedCreateNestedManyWithoutUserInput;
    watchlist?: WatchlistUncheckedCreateNestedManyWithoutUserInput;
  };

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutSessionsInput,
      UserUncheckedCreateWithoutSessionsInput
    >;
  };

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<
      UserUpdateWithoutSessionsInput,
      UserUncheckedUpdateWithoutSessionsInput
    >;
    create: XOR<
      UserCreateWithoutSessionsInput,
      UserUncheckedCreateWithoutSessionsInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutSessionsInput,
      UserUncheckedUpdateWithoutSessionsInput
    >;
  };

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: StringFieldUpdateOperationsInput | string;
    emailVerified?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    password?: NullableStringFieldUpdateOperationsInput | string | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    kycStatus?: EnumKycStatusFieldUpdateOperationsInput | $Enums.KycStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    riskProfile?: RiskProfileUpdateOneWithoutUserNestedInput;
    accounts?: AccountUpdateManyWithoutUserNestedInput;
    portfolios?: PortfolioUpdateManyWithoutUserNestedInput;
    transactions?: TransactionUpdateManyWithoutUserNestedInput;
    watchlist?: WatchlistUpdateManyWithoutUserNestedInput;
  };

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: StringFieldUpdateOperationsInput | string;
    emailVerified?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    password?: NullableStringFieldUpdateOperationsInput | string | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    kycStatus?: EnumKycStatusFieldUpdateOperationsInput | $Enums.KycStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    riskProfile?: RiskProfileUncheckedUpdateOneWithoutUserNestedInput;
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput;
    portfolios?: PortfolioUncheckedUpdateManyWithoutUserNestedInput;
    transactions?: TransactionUncheckedUpdateManyWithoutUserNestedInput;
    watchlist?: WatchlistUncheckedUpdateManyWithoutUserNestedInput;
  };

  export type NavHistoryCreateWithoutFundInput = {
    id?: string;
    nav: Decimal | DecimalJsLike | number | string;
    date: Date | string;
    createdAt?: Date | string;
  };

  export type NavHistoryUncheckedCreateWithoutFundInput = {
    id?: string;
    nav: Decimal | DecimalJsLike | number | string;
    date: Date | string;
    createdAt?: Date | string;
  };

  export type NavHistoryCreateOrConnectWithoutFundInput = {
    where: NavHistoryWhereUniqueInput;
    create: XOR<
      NavHistoryCreateWithoutFundInput,
      NavHistoryUncheckedCreateWithoutFundInput
    >;
  };

  export type NavHistoryCreateManyFundInputEnvelope = {
    data: NavHistoryCreateManyFundInput | NavHistoryCreateManyFundInput[];
    skipDuplicates?: boolean;
  };

  export type HoldingCreateWithoutFundInput = {
    id?: string;
    units: Decimal | DecimalJsLike | number | string;
    avgNav: Decimal | DecimalJsLike | number | string;
    investedAmount: Decimal | DecimalJsLike | number | string;
    purchaseDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    portfolio: PortfolioCreateNestedOneWithoutHoldingsInput;
  };

  export type HoldingUncheckedCreateWithoutFundInput = {
    id?: string;
    portfolioId: string;
    units: Decimal | DecimalJsLike | number | string;
    avgNav: Decimal | DecimalJsLike | number | string;
    investedAmount: Decimal | DecimalJsLike | number | string;
    purchaseDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type HoldingCreateOrConnectWithoutFundInput = {
    where: HoldingWhereUniqueInput;
    create: XOR<
      HoldingCreateWithoutFundInput,
      HoldingUncheckedCreateWithoutFundInput
    >;
  };

  export type HoldingCreateManyFundInputEnvelope = {
    data: HoldingCreateManyFundInput | HoldingCreateManyFundInput[];
    skipDuplicates?: boolean;
  };

  export type TransactionCreateWithoutFundInput = {
    id?: string;
    type: $Enums.TransactionType;
    amount: Decimal | DecimalJsLike | number | string;
    units: Decimal | DecimalJsLike | number | string;
    nav: Decimal | DecimalJsLike | number | string;
    date: Date | string;
    status?: $Enums.TransactionStatus;
    createdAt?: Date | string;
    user: UserCreateNestedOneWithoutTransactionsInput;
  };

  export type TransactionUncheckedCreateWithoutFundInput = {
    id?: string;
    userId: string;
    type: $Enums.TransactionType;
    amount: Decimal | DecimalJsLike | number | string;
    units: Decimal | DecimalJsLike | number | string;
    nav: Decimal | DecimalJsLike | number | string;
    date: Date | string;
    status?: $Enums.TransactionStatus;
    createdAt?: Date | string;
  };

  export type TransactionCreateOrConnectWithoutFundInput = {
    where: TransactionWhereUniqueInput;
    create: XOR<
      TransactionCreateWithoutFundInput,
      TransactionUncheckedCreateWithoutFundInput
    >;
  };

  export type TransactionCreateManyFundInputEnvelope = {
    data: TransactionCreateManyFundInput | TransactionCreateManyFundInput[];
    skipDuplicates?: boolean;
  };

  export type WatchlistCreateWithoutFundInput = {
    id?: string;
    addedAt?: Date | string;
    createdAt?: Date | string;
    user: UserCreateNestedOneWithoutWatchlistInput;
  };

  export type WatchlistUncheckedCreateWithoutFundInput = {
    id?: string;
    userId: string;
    addedAt?: Date | string;
    createdAt?: Date | string;
  };

  export type WatchlistCreateOrConnectWithoutFundInput = {
    where: WatchlistWhereUniqueInput;
    create: XOR<
      WatchlistCreateWithoutFundInput,
      WatchlistUncheckedCreateWithoutFundInput
    >;
  };

  export type WatchlistCreateManyFundInputEnvelope = {
    data: WatchlistCreateManyFundInput | WatchlistCreateManyFundInput[];
    skipDuplicates?: boolean;
  };

  export type NavHistoryUpsertWithWhereUniqueWithoutFundInput = {
    where: NavHistoryWhereUniqueInput;
    update: XOR<
      NavHistoryUpdateWithoutFundInput,
      NavHistoryUncheckedUpdateWithoutFundInput
    >;
    create: XOR<
      NavHistoryCreateWithoutFundInput,
      NavHistoryUncheckedCreateWithoutFundInput
    >;
  };

  export type NavHistoryUpdateWithWhereUniqueWithoutFundInput = {
    where: NavHistoryWhereUniqueInput;
    data: XOR<
      NavHistoryUpdateWithoutFundInput,
      NavHistoryUncheckedUpdateWithoutFundInput
    >;
  };

  export type NavHistoryUpdateManyWithWhereWithoutFundInput = {
    where: NavHistoryScalarWhereInput;
    data: XOR<
      NavHistoryUpdateManyMutationInput,
      NavHistoryUncheckedUpdateManyWithoutFundInput
    >;
  };

  export type NavHistoryScalarWhereInput = {
    AND?: NavHistoryScalarWhereInput | NavHistoryScalarWhereInput[];
    OR?: NavHistoryScalarWhereInput[];
    NOT?: NavHistoryScalarWhereInput | NavHistoryScalarWhereInput[];
    id?: StringFilter<'NavHistory'> | string;
    fundId?: StringFilter<'NavHistory'> | string;
    nav?:
      | DecimalFilter<'NavHistory'>
      | Decimal
      | DecimalJsLike
      | number
      | string;
    date?: DateTimeFilter<'NavHistory'> | Date | string;
    createdAt?: DateTimeFilter<'NavHistory'> | Date | string;
  };

  export type HoldingUpsertWithWhereUniqueWithoutFundInput = {
    where: HoldingWhereUniqueInput;
    update: XOR<
      HoldingUpdateWithoutFundInput,
      HoldingUncheckedUpdateWithoutFundInput
    >;
    create: XOR<
      HoldingCreateWithoutFundInput,
      HoldingUncheckedCreateWithoutFundInput
    >;
  };

  export type HoldingUpdateWithWhereUniqueWithoutFundInput = {
    where: HoldingWhereUniqueInput;
    data: XOR<
      HoldingUpdateWithoutFundInput,
      HoldingUncheckedUpdateWithoutFundInput
    >;
  };

  export type HoldingUpdateManyWithWhereWithoutFundInput = {
    where: HoldingScalarWhereInput;
    data: XOR<
      HoldingUpdateManyMutationInput,
      HoldingUncheckedUpdateManyWithoutFundInput
    >;
  };

  export type HoldingScalarWhereInput = {
    AND?: HoldingScalarWhereInput | HoldingScalarWhereInput[];
    OR?: HoldingScalarWhereInput[];
    NOT?: HoldingScalarWhereInput | HoldingScalarWhereInput[];
    id?: StringFilter<'Holding'> | string;
    portfolioId?: StringFilter<'Holding'> | string;
    fundId?: StringFilter<'Holding'> | string;
    units?:
      | DecimalFilter<'Holding'>
      | Decimal
      | DecimalJsLike
      | number
      | string;
    avgNav?:
      | DecimalFilter<'Holding'>
      | Decimal
      | DecimalJsLike
      | number
      | string;
    investedAmount?:
      | DecimalFilter<'Holding'>
      | Decimal
      | DecimalJsLike
      | number
      | string;
    purchaseDate?: DateTimeNullableFilter<'Holding'> | Date | string | null;
    createdAt?: DateTimeFilter<'Holding'> | Date | string;
    updatedAt?: DateTimeFilter<'Holding'> | Date | string;
  };

  export type TransactionUpsertWithWhereUniqueWithoutFundInput = {
    where: TransactionWhereUniqueInput;
    update: XOR<
      TransactionUpdateWithoutFundInput,
      TransactionUncheckedUpdateWithoutFundInput
    >;
    create: XOR<
      TransactionCreateWithoutFundInput,
      TransactionUncheckedCreateWithoutFundInput
    >;
  };

  export type TransactionUpdateWithWhereUniqueWithoutFundInput = {
    where: TransactionWhereUniqueInput;
    data: XOR<
      TransactionUpdateWithoutFundInput,
      TransactionUncheckedUpdateWithoutFundInput
    >;
  };

  export type TransactionUpdateManyWithWhereWithoutFundInput = {
    where: TransactionScalarWhereInput;
    data: XOR<
      TransactionUpdateManyMutationInput,
      TransactionUncheckedUpdateManyWithoutFundInput
    >;
  };

  export type WatchlistUpsertWithWhereUniqueWithoutFundInput = {
    where: WatchlistWhereUniqueInput;
    update: XOR<
      WatchlistUpdateWithoutFundInput,
      WatchlistUncheckedUpdateWithoutFundInput
    >;
    create: XOR<
      WatchlistCreateWithoutFundInput,
      WatchlistUncheckedCreateWithoutFundInput
    >;
  };

  export type WatchlistUpdateWithWhereUniqueWithoutFundInput = {
    where: WatchlistWhereUniqueInput;
    data: XOR<
      WatchlistUpdateWithoutFundInput,
      WatchlistUncheckedUpdateWithoutFundInput
    >;
  };

  export type WatchlistUpdateManyWithWhereWithoutFundInput = {
    where: WatchlistScalarWhereInput;
    data: XOR<
      WatchlistUpdateManyMutationInput,
      WatchlistUncheckedUpdateManyWithoutFundInput
    >;
  };

  export type FundCreateWithoutNavHistoryInput = {
    id?: string;
    schemeCode: string;
    schemeName: string;
    amcName: string;
    category: string;
    subCategory?: string | null;
    nav: Decimal | DecimalJsLike | number | string;
    aum?: Decimal | DecimalJsLike | number | string | null;
    expenseRatio?: Decimal | DecimalJsLike | number | string | null;
    sharpeRatio?: Decimal | DecimalJsLike | number | string | null;
    alpha?: Decimal | DecimalJsLike | number | string | null;
    beta?: Decimal | DecimalJsLike | number | string | null;
    stdDeviation?: Decimal | DecimalJsLike | number | string | null;
    returns1y?: Decimal | DecimalJsLike | number | string | null;
    returns3y?: Decimal | DecimalJsLike | number | string | null;
    returns5y?: Decimal | DecimalJsLike | number | string | null;
    returns10y?: Decimal | DecimalJsLike | number | string | null;
    managerName?: string | null;
    launchDate?: Date | string | null;
    benchmarkIndex?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    holdings?: HoldingCreateNestedManyWithoutFundInput;
    transactions?: TransactionCreateNestedManyWithoutFundInput;
    watchlist?: WatchlistCreateNestedManyWithoutFundInput;
  };

  export type FundUncheckedCreateWithoutNavHistoryInput = {
    id?: string;
    schemeCode: string;
    schemeName: string;
    amcName: string;
    category: string;
    subCategory?: string | null;
    nav: Decimal | DecimalJsLike | number | string;
    aum?: Decimal | DecimalJsLike | number | string | null;
    expenseRatio?: Decimal | DecimalJsLike | number | string | null;
    sharpeRatio?: Decimal | DecimalJsLike | number | string | null;
    alpha?: Decimal | DecimalJsLike | number | string | null;
    beta?: Decimal | DecimalJsLike | number | string | null;
    stdDeviation?: Decimal | DecimalJsLike | number | string | null;
    returns1y?: Decimal | DecimalJsLike | number | string | null;
    returns3y?: Decimal | DecimalJsLike | number | string | null;
    returns5y?: Decimal | DecimalJsLike | number | string | null;
    returns10y?: Decimal | DecimalJsLike | number | string | null;
    managerName?: string | null;
    launchDate?: Date | string | null;
    benchmarkIndex?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    holdings?: HoldingUncheckedCreateNestedManyWithoutFundInput;
    transactions?: TransactionUncheckedCreateNestedManyWithoutFundInput;
    watchlist?: WatchlistUncheckedCreateNestedManyWithoutFundInput;
  };

  export type FundCreateOrConnectWithoutNavHistoryInput = {
    where: FundWhereUniqueInput;
    create: XOR<
      FundCreateWithoutNavHistoryInput,
      FundUncheckedCreateWithoutNavHistoryInput
    >;
  };

  export type FundUpsertWithoutNavHistoryInput = {
    update: XOR<
      FundUpdateWithoutNavHistoryInput,
      FundUncheckedUpdateWithoutNavHistoryInput
    >;
    create: XOR<
      FundCreateWithoutNavHistoryInput,
      FundUncheckedCreateWithoutNavHistoryInput
    >;
    where?: FundWhereInput;
  };

  export type FundUpdateToOneWithWhereWithoutNavHistoryInput = {
    where?: FundWhereInput;
    data: XOR<
      FundUpdateWithoutNavHistoryInput,
      FundUncheckedUpdateWithoutNavHistoryInput
    >;
  };

  export type FundUpdateWithoutNavHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string;
    schemeCode?: StringFieldUpdateOperationsInput | string;
    schemeName?: StringFieldUpdateOperationsInput | string;
    amcName?: StringFieldUpdateOperationsInput | string;
    category?: StringFieldUpdateOperationsInput | string;
    subCategory?: NullableStringFieldUpdateOperationsInput | string | null;
    nav?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    aum?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    expenseRatio?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    sharpeRatio?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    alpha?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    beta?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    stdDeviation?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    returns1y?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    returns3y?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    returns5y?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    returns10y?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    managerName?: NullableStringFieldUpdateOperationsInput | string | null;
    launchDate?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    benchmarkIndex?: NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    holdings?: HoldingUpdateManyWithoutFundNestedInput;
    transactions?: TransactionUpdateManyWithoutFundNestedInput;
    watchlist?: WatchlistUpdateManyWithoutFundNestedInput;
  };

  export type FundUncheckedUpdateWithoutNavHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string;
    schemeCode?: StringFieldUpdateOperationsInput | string;
    schemeName?: StringFieldUpdateOperationsInput | string;
    amcName?: StringFieldUpdateOperationsInput | string;
    category?: StringFieldUpdateOperationsInput | string;
    subCategory?: NullableStringFieldUpdateOperationsInput | string | null;
    nav?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    aum?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    expenseRatio?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    sharpeRatio?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    alpha?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    beta?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    stdDeviation?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    returns1y?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    returns3y?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    returns5y?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    returns10y?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    managerName?: NullableStringFieldUpdateOperationsInput | string | null;
    launchDate?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    benchmarkIndex?: NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    holdings?: HoldingUncheckedUpdateManyWithoutFundNestedInput;
    transactions?: TransactionUncheckedUpdateManyWithoutFundNestedInput;
    watchlist?: WatchlistUncheckedUpdateManyWithoutFundNestedInput;
  };

  export type UserCreateWithoutPortfoliosInput = {
    id?: string;
    name?: string | null;
    email: string;
    emailVerified?: Date | string | null;
    password?: string | null;
    image?: string | null;
    role?: $Enums.UserRole;
    kycStatus?: $Enums.KycStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    riskProfile?: RiskProfileCreateNestedOneWithoutUserInput;
    accounts?: AccountCreateNestedManyWithoutUserInput;
    sessions?: SessionCreateNestedManyWithoutUserInput;
    transactions?: TransactionCreateNestedManyWithoutUserInput;
    watchlist?: WatchlistCreateNestedManyWithoutUserInput;
  };

  export type UserUncheckedCreateWithoutPortfoliosInput = {
    id?: string;
    name?: string | null;
    email: string;
    emailVerified?: Date | string | null;
    password?: string | null;
    image?: string | null;
    role?: $Enums.UserRole;
    kycStatus?: $Enums.KycStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    riskProfile?: RiskProfileUncheckedCreateNestedOneWithoutUserInput;
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput;
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput;
    transactions?: TransactionUncheckedCreateNestedManyWithoutUserInput;
    watchlist?: WatchlistUncheckedCreateNestedManyWithoutUserInput;
  };

  export type UserCreateOrConnectWithoutPortfoliosInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutPortfoliosInput,
      UserUncheckedCreateWithoutPortfoliosInput
    >;
  };

  export type HoldingCreateWithoutPortfolioInput = {
    id?: string;
    units: Decimal | DecimalJsLike | number | string;
    avgNav: Decimal | DecimalJsLike | number | string;
    investedAmount: Decimal | DecimalJsLike | number | string;
    purchaseDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    fund: FundCreateNestedOneWithoutHoldingsInput;
  };

  export type HoldingUncheckedCreateWithoutPortfolioInput = {
    id?: string;
    fundId: string;
    units: Decimal | DecimalJsLike | number | string;
    avgNav: Decimal | DecimalJsLike | number | string;
    investedAmount: Decimal | DecimalJsLike | number | string;
    purchaseDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type HoldingCreateOrConnectWithoutPortfolioInput = {
    where: HoldingWhereUniqueInput;
    create: XOR<
      HoldingCreateWithoutPortfolioInput,
      HoldingUncheckedCreateWithoutPortfolioInput
    >;
  };

  export type HoldingCreateManyPortfolioInputEnvelope = {
    data: HoldingCreateManyPortfolioInput | HoldingCreateManyPortfolioInput[];
    skipDuplicates?: boolean;
  };

  export type UserUpsertWithoutPortfoliosInput = {
    update: XOR<
      UserUpdateWithoutPortfoliosInput,
      UserUncheckedUpdateWithoutPortfoliosInput
    >;
    create: XOR<
      UserCreateWithoutPortfoliosInput,
      UserUncheckedCreateWithoutPortfoliosInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutPortfoliosInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutPortfoliosInput,
      UserUncheckedUpdateWithoutPortfoliosInput
    >;
  };

  export type UserUpdateWithoutPortfoliosInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: StringFieldUpdateOperationsInput | string;
    emailVerified?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    password?: NullableStringFieldUpdateOperationsInput | string | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    kycStatus?: EnumKycStatusFieldUpdateOperationsInput | $Enums.KycStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    riskProfile?: RiskProfileUpdateOneWithoutUserNestedInput;
    accounts?: AccountUpdateManyWithoutUserNestedInput;
    sessions?: SessionUpdateManyWithoutUserNestedInput;
    transactions?: TransactionUpdateManyWithoutUserNestedInput;
    watchlist?: WatchlistUpdateManyWithoutUserNestedInput;
  };

  export type UserUncheckedUpdateWithoutPortfoliosInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: StringFieldUpdateOperationsInput | string;
    emailVerified?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    password?: NullableStringFieldUpdateOperationsInput | string | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    kycStatus?: EnumKycStatusFieldUpdateOperationsInput | $Enums.KycStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    riskProfile?: RiskProfileUncheckedUpdateOneWithoutUserNestedInput;
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput;
    transactions?: TransactionUncheckedUpdateManyWithoutUserNestedInput;
    watchlist?: WatchlistUncheckedUpdateManyWithoutUserNestedInput;
  };

  export type HoldingUpsertWithWhereUniqueWithoutPortfolioInput = {
    where: HoldingWhereUniqueInput;
    update: XOR<
      HoldingUpdateWithoutPortfolioInput,
      HoldingUncheckedUpdateWithoutPortfolioInput
    >;
    create: XOR<
      HoldingCreateWithoutPortfolioInput,
      HoldingUncheckedCreateWithoutPortfolioInput
    >;
  };

  export type HoldingUpdateWithWhereUniqueWithoutPortfolioInput = {
    where: HoldingWhereUniqueInput;
    data: XOR<
      HoldingUpdateWithoutPortfolioInput,
      HoldingUncheckedUpdateWithoutPortfolioInput
    >;
  };

  export type HoldingUpdateManyWithWhereWithoutPortfolioInput = {
    where: HoldingScalarWhereInput;
    data: XOR<
      HoldingUpdateManyMutationInput,
      HoldingUncheckedUpdateManyWithoutPortfolioInput
    >;
  };

  export type PortfolioCreateWithoutHoldingsInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: UserCreateNestedOneWithoutPortfoliosInput;
  };

  export type PortfolioUncheckedCreateWithoutHoldingsInput = {
    id?: string;
    userId: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type PortfolioCreateOrConnectWithoutHoldingsInput = {
    where: PortfolioWhereUniqueInput;
    create: XOR<
      PortfolioCreateWithoutHoldingsInput,
      PortfolioUncheckedCreateWithoutHoldingsInput
    >;
  };

  export type FundCreateWithoutHoldingsInput = {
    id?: string;
    schemeCode: string;
    schemeName: string;
    amcName: string;
    category: string;
    subCategory?: string | null;
    nav: Decimal | DecimalJsLike | number | string;
    aum?: Decimal | DecimalJsLike | number | string | null;
    expenseRatio?: Decimal | DecimalJsLike | number | string | null;
    sharpeRatio?: Decimal | DecimalJsLike | number | string | null;
    alpha?: Decimal | DecimalJsLike | number | string | null;
    beta?: Decimal | DecimalJsLike | number | string | null;
    stdDeviation?: Decimal | DecimalJsLike | number | string | null;
    returns1y?: Decimal | DecimalJsLike | number | string | null;
    returns3y?: Decimal | DecimalJsLike | number | string | null;
    returns5y?: Decimal | DecimalJsLike | number | string | null;
    returns10y?: Decimal | DecimalJsLike | number | string | null;
    managerName?: string | null;
    launchDate?: Date | string | null;
    benchmarkIndex?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    navHistory?: NavHistoryCreateNestedManyWithoutFundInput;
    transactions?: TransactionCreateNestedManyWithoutFundInput;
    watchlist?: WatchlistCreateNestedManyWithoutFundInput;
  };

  export type FundUncheckedCreateWithoutHoldingsInput = {
    id?: string;
    schemeCode: string;
    schemeName: string;
    amcName: string;
    category: string;
    subCategory?: string | null;
    nav: Decimal | DecimalJsLike | number | string;
    aum?: Decimal | DecimalJsLike | number | string | null;
    expenseRatio?: Decimal | DecimalJsLike | number | string | null;
    sharpeRatio?: Decimal | DecimalJsLike | number | string | null;
    alpha?: Decimal | DecimalJsLike | number | string | null;
    beta?: Decimal | DecimalJsLike | number | string | null;
    stdDeviation?: Decimal | DecimalJsLike | number | string | null;
    returns1y?: Decimal | DecimalJsLike | number | string | null;
    returns3y?: Decimal | DecimalJsLike | number | string | null;
    returns5y?: Decimal | DecimalJsLike | number | string | null;
    returns10y?: Decimal | DecimalJsLike | number | string | null;
    managerName?: string | null;
    launchDate?: Date | string | null;
    benchmarkIndex?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    navHistory?: NavHistoryUncheckedCreateNestedManyWithoutFundInput;
    transactions?: TransactionUncheckedCreateNestedManyWithoutFundInput;
    watchlist?: WatchlistUncheckedCreateNestedManyWithoutFundInput;
  };

  export type FundCreateOrConnectWithoutHoldingsInput = {
    where: FundWhereUniqueInput;
    create: XOR<
      FundCreateWithoutHoldingsInput,
      FundUncheckedCreateWithoutHoldingsInput
    >;
  };

  export type PortfolioUpsertWithoutHoldingsInput = {
    update: XOR<
      PortfolioUpdateWithoutHoldingsInput,
      PortfolioUncheckedUpdateWithoutHoldingsInput
    >;
    create: XOR<
      PortfolioCreateWithoutHoldingsInput,
      PortfolioUncheckedCreateWithoutHoldingsInput
    >;
    where?: PortfolioWhereInput;
  };

  export type PortfolioUpdateToOneWithWhereWithoutHoldingsInput = {
    where?: PortfolioWhereInput;
    data: XOR<
      PortfolioUpdateWithoutHoldingsInput,
      PortfolioUncheckedUpdateWithoutHoldingsInput
    >;
  };

  export type PortfolioUpdateWithoutHoldingsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutPortfoliosNestedInput;
  };

  export type PortfolioUncheckedUpdateWithoutHoldingsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type FundUpsertWithoutHoldingsInput = {
    update: XOR<
      FundUpdateWithoutHoldingsInput,
      FundUncheckedUpdateWithoutHoldingsInput
    >;
    create: XOR<
      FundCreateWithoutHoldingsInput,
      FundUncheckedCreateWithoutHoldingsInput
    >;
    where?: FundWhereInput;
  };

  export type FundUpdateToOneWithWhereWithoutHoldingsInput = {
    where?: FundWhereInput;
    data: XOR<
      FundUpdateWithoutHoldingsInput,
      FundUncheckedUpdateWithoutHoldingsInput
    >;
  };

  export type FundUpdateWithoutHoldingsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    schemeCode?: StringFieldUpdateOperationsInput | string;
    schemeName?: StringFieldUpdateOperationsInput | string;
    amcName?: StringFieldUpdateOperationsInput | string;
    category?: StringFieldUpdateOperationsInput | string;
    subCategory?: NullableStringFieldUpdateOperationsInput | string | null;
    nav?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    aum?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    expenseRatio?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    sharpeRatio?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    alpha?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    beta?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    stdDeviation?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    returns1y?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    returns3y?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    returns5y?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    returns10y?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    managerName?: NullableStringFieldUpdateOperationsInput | string | null;
    launchDate?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    benchmarkIndex?: NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    navHistory?: NavHistoryUpdateManyWithoutFundNestedInput;
    transactions?: TransactionUpdateManyWithoutFundNestedInput;
    watchlist?: WatchlistUpdateManyWithoutFundNestedInput;
  };

  export type FundUncheckedUpdateWithoutHoldingsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    schemeCode?: StringFieldUpdateOperationsInput | string;
    schemeName?: StringFieldUpdateOperationsInput | string;
    amcName?: StringFieldUpdateOperationsInput | string;
    category?: StringFieldUpdateOperationsInput | string;
    subCategory?: NullableStringFieldUpdateOperationsInput | string | null;
    nav?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    aum?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    expenseRatio?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    sharpeRatio?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    alpha?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    beta?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    stdDeviation?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    returns1y?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    returns3y?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    returns5y?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    returns10y?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    managerName?: NullableStringFieldUpdateOperationsInput | string | null;
    launchDate?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    benchmarkIndex?: NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    navHistory?: NavHistoryUncheckedUpdateManyWithoutFundNestedInput;
    transactions?: TransactionUncheckedUpdateManyWithoutFundNestedInput;
    watchlist?: WatchlistUncheckedUpdateManyWithoutFundNestedInput;
  };

  export type UserCreateWithoutTransactionsInput = {
    id?: string;
    name?: string | null;
    email: string;
    emailVerified?: Date | string | null;
    password?: string | null;
    image?: string | null;
    role?: $Enums.UserRole;
    kycStatus?: $Enums.KycStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    riskProfile?: RiskProfileCreateNestedOneWithoutUserInput;
    accounts?: AccountCreateNestedManyWithoutUserInput;
    sessions?: SessionCreateNestedManyWithoutUserInput;
    portfolios?: PortfolioCreateNestedManyWithoutUserInput;
    watchlist?: WatchlistCreateNestedManyWithoutUserInput;
  };

  export type UserUncheckedCreateWithoutTransactionsInput = {
    id?: string;
    name?: string | null;
    email: string;
    emailVerified?: Date | string | null;
    password?: string | null;
    image?: string | null;
    role?: $Enums.UserRole;
    kycStatus?: $Enums.KycStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    riskProfile?: RiskProfileUncheckedCreateNestedOneWithoutUserInput;
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput;
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput;
    portfolios?: PortfolioUncheckedCreateNestedManyWithoutUserInput;
    watchlist?: WatchlistUncheckedCreateNestedManyWithoutUserInput;
  };

  export type UserCreateOrConnectWithoutTransactionsInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutTransactionsInput,
      UserUncheckedCreateWithoutTransactionsInput
    >;
  };

  export type FundCreateWithoutTransactionsInput = {
    id?: string;
    schemeCode: string;
    schemeName: string;
    amcName: string;
    category: string;
    subCategory?: string | null;
    nav: Decimal | DecimalJsLike | number | string;
    aum?: Decimal | DecimalJsLike | number | string | null;
    expenseRatio?: Decimal | DecimalJsLike | number | string | null;
    sharpeRatio?: Decimal | DecimalJsLike | number | string | null;
    alpha?: Decimal | DecimalJsLike | number | string | null;
    beta?: Decimal | DecimalJsLike | number | string | null;
    stdDeviation?: Decimal | DecimalJsLike | number | string | null;
    returns1y?: Decimal | DecimalJsLike | number | string | null;
    returns3y?: Decimal | DecimalJsLike | number | string | null;
    returns5y?: Decimal | DecimalJsLike | number | string | null;
    returns10y?: Decimal | DecimalJsLike | number | string | null;
    managerName?: string | null;
    launchDate?: Date | string | null;
    benchmarkIndex?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    navHistory?: NavHistoryCreateNestedManyWithoutFundInput;
    holdings?: HoldingCreateNestedManyWithoutFundInput;
    watchlist?: WatchlistCreateNestedManyWithoutFundInput;
  };

  export type FundUncheckedCreateWithoutTransactionsInput = {
    id?: string;
    schemeCode: string;
    schemeName: string;
    amcName: string;
    category: string;
    subCategory?: string | null;
    nav: Decimal | DecimalJsLike | number | string;
    aum?: Decimal | DecimalJsLike | number | string | null;
    expenseRatio?: Decimal | DecimalJsLike | number | string | null;
    sharpeRatio?: Decimal | DecimalJsLike | number | string | null;
    alpha?: Decimal | DecimalJsLike | number | string | null;
    beta?: Decimal | DecimalJsLike | number | string | null;
    stdDeviation?: Decimal | DecimalJsLike | number | string | null;
    returns1y?: Decimal | DecimalJsLike | number | string | null;
    returns3y?: Decimal | DecimalJsLike | number | string | null;
    returns5y?: Decimal | DecimalJsLike | number | string | null;
    returns10y?: Decimal | DecimalJsLike | number | string | null;
    managerName?: string | null;
    launchDate?: Date | string | null;
    benchmarkIndex?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    navHistory?: NavHistoryUncheckedCreateNestedManyWithoutFundInput;
    holdings?: HoldingUncheckedCreateNestedManyWithoutFundInput;
    watchlist?: WatchlistUncheckedCreateNestedManyWithoutFundInput;
  };

  export type FundCreateOrConnectWithoutTransactionsInput = {
    where: FundWhereUniqueInput;
    create: XOR<
      FundCreateWithoutTransactionsInput,
      FundUncheckedCreateWithoutTransactionsInput
    >;
  };

  export type UserUpsertWithoutTransactionsInput = {
    update: XOR<
      UserUpdateWithoutTransactionsInput,
      UserUncheckedUpdateWithoutTransactionsInput
    >;
    create: XOR<
      UserCreateWithoutTransactionsInput,
      UserUncheckedCreateWithoutTransactionsInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutTransactionsInput,
      UserUncheckedUpdateWithoutTransactionsInput
    >;
  };

  export type UserUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: StringFieldUpdateOperationsInput | string;
    emailVerified?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    password?: NullableStringFieldUpdateOperationsInput | string | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    kycStatus?: EnumKycStatusFieldUpdateOperationsInput | $Enums.KycStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    riskProfile?: RiskProfileUpdateOneWithoutUserNestedInput;
    accounts?: AccountUpdateManyWithoutUserNestedInput;
    sessions?: SessionUpdateManyWithoutUserNestedInput;
    portfolios?: PortfolioUpdateManyWithoutUserNestedInput;
    watchlist?: WatchlistUpdateManyWithoutUserNestedInput;
  };

  export type UserUncheckedUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: StringFieldUpdateOperationsInput | string;
    emailVerified?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    password?: NullableStringFieldUpdateOperationsInput | string | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    kycStatus?: EnumKycStatusFieldUpdateOperationsInput | $Enums.KycStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    riskProfile?: RiskProfileUncheckedUpdateOneWithoutUserNestedInput;
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput;
    portfolios?: PortfolioUncheckedUpdateManyWithoutUserNestedInput;
    watchlist?: WatchlistUncheckedUpdateManyWithoutUserNestedInput;
  };

  export type FundUpsertWithoutTransactionsInput = {
    update: XOR<
      FundUpdateWithoutTransactionsInput,
      FundUncheckedUpdateWithoutTransactionsInput
    >;
    create: XOR<
      FundCreateWithoutTransactionsInput,
      FundUncheckedCreateWithoutTransactionsInput
    >;
    where?: FundWhereInput;
  };

  export type FundUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: FundWhereInput;
    data: XOR<
      FundUpdateWithoutTransactionsInput,
      FundUncheckedUpdateWithoutTransactionsInput
    >;
  };

  export type FundUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    schemeCode?: StringFieldUpdateOperationsInput | string;
    schemeName?: StringFieldUpdateOperationsInput | string;
    amcName?: StringFieldUpdateOperationsInput | string;
    category?: StringFieldUpdateOperationsInput | string;
    subCategory?: NullableStringFieldUpdateOperationsInput | string | null;
    nav?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    aum?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    expenseRatio?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    sharpeRatio?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    alpha?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    beta?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    stdDeviation?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    returns1y?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    returns3y?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    returns5y?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    returns10y?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    managerName?: NullableStringFieldUpdateOperationsInput | string | null;
    launchDate?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    benchmarkIndex?: NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    navHistory?: NavHistoryUpdateManyWithoutFundNestedInput;
    holdings?: HoldingUpdateManyWithoutFundNestedInput;
    watchlist?: WatchlistUpdateManyWithoutFundNestedInput;
  };

  export type FundUncheckedUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    schemeCode?: StringFieldUpdateOperationsInput | string;
    schemeName?: StringFieldUpdateOperationsInput | string;
    amcName?: StringFieldUpdateOperationsInput | string;
    category?: StringFieldUpdateOperationsInput | string;
    subCategory?: NullableStringFieldUpdateOperationsInput | string | null;
    nav?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    aum?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    expenseRatio?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    sharpeRatio?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    alpha?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    beta?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    stdDeviation?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    returns1y?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    returns3y?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    returns5y?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    returns10y?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    managerName?: NullableStringFieldUpdateOperationsInput | string | null;
    launchDate?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    benchmarkIndex?: NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    navHistory?: NavHistoryUncheckedUpdateManyWithoutFundNestedInput;
    holdings?: HoldingUncheckedUpdateManyWithoutFundNestedInput;
    watchlist?: WatchlistUncheckedUpdateManyWithoutFundNestedInput;
  };

  export type UserCreateWithoutWatchlistInput = {
    id?: string;
    name?: string | null;
    email: string;
    emailVerified?: Date | string | null;
    password?: string | null;
    image?: string | null;
    role?: $Enums.UserRole;
    kycStatus?: $Enums.KycStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    riskProfile?: RiskProfileCreateNestedOneWithoutUserInput;
    accounts?: AccountCreateNestedManyWithoutUserInput;
    sessions?: SessionCreateNestedManyWithoutUserInput;
    portfolios?: PortfolioCreateNestedManyWithoutUserInput;
    transactions?: TransactionCreateNestedManyWithoutUserInput;
  };

  export type UserUncheckedCreateWithoutWatchlistInput = {
    id?: string;
    name?: string | null;
    email: string;
    emailVerified?: Date | string | null;
    password?: string | null;
    image?: string | null;
    role?: $Enums.UserRole;
    kycStatus?: $Enums.KycStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    riskProfile?: RiskProfileUncheckedCreateNestedOneWithoutUserInput;
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput;
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput;
    portfolios?: PortfolioUncheckedCreateNestedManyWithoutUserInput;
    transactions?: TransactionUncheckedCreateNestedManyWithoutUserInput;
  };

  export type UserCreateOrConnectWithoutWatchlistInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutWatchlistInput,
      UserUncheckedCreateWithoutWatchlistInput
    >;
  };

  export type FundCreateWithoutWatchlistInput = {
    id?: string;
    schemeCode: string;
    schemeName: string;
    amcName: string;
    category: string;
    subCategory?: string | null;
    nav: Decimal | DecimalJsLike | number | string;
    aum?: Decimal | DecimalJsLike | number | string | null;
    expenseRatio?: Decimal | DecimalJsLike | number | string | null;
    sharpeRatio?: Decimal | DecimalJsLike | number | string | null;
    alpha?: Decimal | DecimalJsLike | number | string | null;
    beta?: Decimal | DecimalJsLike | number | string | null;
    stdDeviation?: Decimal | DecimalJsLike | number | string | null;
    returns1y?: Decimal | DecimalJsLike | number | string | null;
    returns3y?: Decimal | DecimalJsLike | number | string | null;
    returns5y?: Decimal | DecimalJsLike | number | string | null;
    returns10y?: Decimal | DecimalJsLike | number | string | null;
    managerName?: string | null;
    launchDate?: Date | string | null;
    benchmarkIndex?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    navHistory?: NavHistoryCreateNestedManyWithoutFundInput;
    holdings?: HoldingCreateNestedManyWithoutFundInput;
    transactions?: TransactionCreateNestedManyWithoutFundInput;
  };

  export type FundUncheckedCreateWithoutWatchlistInput = {
    id?: string;
    schemeCode: string;
    schemeName: string;
    amcName: string;
    category: string;
    subCategory?: string | null;
    nav: Decimal | DecimalJsLike | number | string;
    aum?: Decimal | DecimalJsLike | number | string | null;
    expenseRatio?: Decimal | DecimalJsLike | number | string | null;
    sharpeRatio?: Decimal | DecimalJsLike | number | string | null;
    alpha?: Decimal | DecimalJsLike | number | string | null;
    beta?: Decimal | DecimalJsLike | number | string | null;
    stdDeviation?: Decimal | DecimalJsLike | number | string | null;
    returns1y?: Decimal | DecimalJsLike | number | string | null;
    returns3y?: Decimal | DecimalJsLike | number | string | null;
    returns5y?: Decimal | DecimalJsLike | number | string | null;
    returns10y?: Decimal | DecimalJsLike | number | string | null;
    managerName?: string | null;
    launchDate?: Date | string | null;
    benchmarkIndex?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    navHistory?: NavHistoryUncheckedCreateNestedManyWithoutFundInput;
    holdings?: HoldingUncheckedCreateNestedManyWithoutFundInput;
    transactions?: TransactionUncheckedCreateNestedManyWithoutFundInput;
  };

  export type FundCreateOrConnectWithoutWatchlistInput = {
    where: FundWhereUniqueInput;
    create: XOR<
      FundCreateWithoutWatchlistInput,
      FundUncheckedCreateWithoutWatchlistInput
    >;
  };

  export type UserUpsertWithoutWatchlistInput = {
    update: XOR<
      UserUpdateWithoutWatchlistInput,
      UserUncheckedUpdateWithoutWatchlistInput
    >;
    create: XOR<
      UserCreateWithoutWatchlistInput,
      UserUncheckedCreateWithoutWatchlistInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutWatchlistInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutWatchlistInput,
      UserUncheckedUpdateWithoutWatchlistInput
    >;
  };

  export type UserUpdateWithoutWatchlistInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: StringFieldUpdateOperationsInput | string;
    emailVerified?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    password?: NullableStringFieldUpdateOperationsInput | string | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    kycStatus?: EnumKycStatusFieldUpdateOperationsInput | $Enums.KycStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    riskProfile?: RiskProfileUpdateOneWithoutUserNestedInput;
    accounts?: AccountUpdateManyWithoutUserNestedInput;
    sessions?: SessionUpdateManyWithoutUserNestedInput;
    portfolios?: PortfolioUpdateManyWithoutUserNestedInput;
    transactions?: TransactionUpdateManyWithoutUserNestedInput;
  };

  export type UserUncheckedUpdateWithoutWatchlistInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: StringFieldUpdateOperationsInput | string;
    emailVerified?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    password?: NullableStringFieldUpdateOperationsInput | string | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    kycStatus?: EnumKycStatusFieldUpdateOperationsInput | $Enums.KycStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    riskProfile?: RiskProfileUncheckedUpdateOneWithoutUserNestedInput;
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput;
    portfolios?: PortfolioUncheckedUpdateManyWithoutUserNestedInput;
    transactions?: TransactionUncheckedUpdateManyWithoutUserNestedInput;
  };

  export type FundUpsertWithoutWatchlistInput = {
    update: XOR<
      FundUpdateWithoutWatchlistInput,
      FundUncheckedUpdateWithoutWatchlistInput
    >;
    create: XOR<
      FundCreateWithoutWatchlistInput,
      FundUncheckedCreateWithoutWatchlistInput
    >;
    where?: FundWhereInput;
  };

  export type FundUpdateToOneWithWhereWithoutWatchlistInput = {
    where?: FundWhereInput;
    data: XOR<
      FundUpdateWithoutWatchlistInput,
      FundUncheckedUpdateWithoutWatchlistInput
    >;
  };

  export type FundUpdateWithoutWatchlistInput = {
    id?: StringFieldUpdateOperationsInput | string;
    schemeCode?: StringFieldUpdateOperationsInput | string;
    schemeName?: StringFieldUpdateOperationsInput | string;
    amcName?: StringFieldUpdateOperationsInput | string;
    category?: StringFieldUpdateOperationsInput | string;
    subCategory?: NullableStringFieldUpdateOperationsInput | string | null;
    nav?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    aum?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    expenseRatio?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    sharpeRatio?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    alpha?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    beta?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    stdDeviation?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    returns1y?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    returns3y?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    returns5y?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    returns10y?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    managerName?: NullableStringFieldUpdateOperationsInput | string | null;
    launchDate?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    benchmarkIndex?: NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    navHistory?: NavHistoryUpdateManyWithoutFundNestedInput;
    holdings?: HoldingUpdateManyWithoutFundNestedInput;
    transactions?: TransactionUpdateManyWithoutFundNestedInput;
  };

  export type FundUncheckedUpdateWithoutWatchlistInput = {
    id?: StringFieldUpdateOperationsInput | string;
    schemeCode?: StringFieldUpdateOperationsInput | string;
    schemeName?: StringFieldUpdateOperationsInput | string;
    amcName?: StringFieldUpdateOperationsInput | string;
    category?: StringFieldUpdateOperationsInput | string;
    subCategory?: NullableStringFieldUpdateOperationsInput | string | null;
    nav?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    aum?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    expenseRatio?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    sharpeRatio?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    alpha?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    beta?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    stdDeviation?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    returns1y?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    returns3y?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    returns5y?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    returns10y?:
      | NullableDecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string
      | null;
    managerName?: NullableStringFieldUpdateOperationsInput | string | null;
    launchDate?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    benchmarkIndex?: NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    navHistory?: NavHistoryUncheckedUpdateManyWithoutFundNestedInput;
    holdings?: HoldingUncheckedUpdateManyWithoutFundNestedInput;
    transactions?: TransactionUncheckedUpdateManyWithoutFundNestedInput;
  };

  export type UserCreateWithoutRiskProfileInput = {
    id?: string;
    name?: string | null;
    email: string;
    emailVerified?: Date | string | null;
    password?: string | null;
    image?: string | null;
    role?: $Enums.UserRole;
    kycStatus?: $Enums.KycStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    accounts?: AccountCreateNestedManyWithoutUserInput;
    sessions?: SessionCreateNestedManyWithoutUserInput;
    portfolios?: PortfolioCreateNestedManyWithoutUserInput;
    transactions?: TransactionCreateNestedManyWithoutUserInput;
    watchlist?: WatchlistCreateNestedManyWithoutUserInput;
  };

  export type UserUncheckedCreateWithoutRiskProfileInput = {
    id?: string;
    name?: string | null;
    email: string;
    emailVerified?: Date | string | null;
    password?: string | null;
    image?: string | null;
    role?: $Enums.UserRole;
    kycStatus?: $Enums.KycStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput;
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput;
    portfolios?: PortfolioUncheckedCreateNestedManyWithoutUserInput;
    transactions?: TransactionUncheckedCreateNestedManyWithoutUserInput;
    watchlist?: WatchlistUncheckedCreateNestedManyWithoutUserInput;
  };

  export type UserCreateOrConnectWithoutRiskProfileInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutRiskProfileInput,
      UserUncheckedCreateWithoutRiskProfileInput
    >;
  };

  export type UserUpsertWithoutRiskProfileInput = {
    update: XOR<
      UserUpdateWithoutRiskProfileInput,
      UserUncheckedUpdateWithoutRiskProfileInput
    >;
    create: XOR<
      UserCreateWithoutRiskProfileInput,
      UserUncheckedCreateWithoutRiskProfileInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutRiskProfileInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutRiskProfileInput,
      UserUncheckedUpdateWithoutRiskProfileInput
    >;
  };

  export type UserUpdateWithoutRiskProfileInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: StringFieldUpdateOperationsInput | string;
    emailVerified?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    password?: NullableStringFieldUpdateOperationsInput | string | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    kycStatus?: EnumKycStatusFieldUpdateOperationsInput | $Enums.KycStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    accounts?: AccountUpdateManyWithoutUserNestedInput;
    sessions?: SessionUpdateManyWithoutUserNestedInput;
    portfolios?: PortfolioUpdateManyWithoutUserNestedInput;
    transactions?: TransactionUpdateManyWithoutUserNestedInput;
    watchlist?: WatchlistUpdateManyWithoutUserNestedInput;
  };

  export type UserUncheckedUpdateWithoutRiskProfileInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: StringFieldUpdateOperationsInput | string;
    emailVerified?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    password?: NullableStringFieldUpdateOperationsInput | string | null;
    image?: NullableStringFieldUpdateOperationsInput | string | null;
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    kycStatus?: EnumKycStatusFieldUpdateOperationsInput | $Enums.KycStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput;
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput;
    portfolios?: PortfolioUncheckedUpdateManyWithoutUserNestedInput;
    transactions?: TransactionUncheckedUpdateManyWithoutUserNestedInput;
    watchlist?: WatchlistUncheckedUpdateManyWithoutUserNestedInput;
  };

  export type AccountCreateManyUserInput = {
    id?: string;
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token?: string | null;
    access_token?: string | null;
    expires_at?: number | null;
    token_type?: string | null;
    scope?: string | null;
    id_token?: string | null;
    session_state?: string | null;
  };

  export type SessionCreateManyUserInput = {
    id?: string;
    sessionToken: string;
    expires: Date | string;
  };

  export type PortfolioCreateManyUserInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type TransactionCreateManyUserInput = {
    id?: string;
    fundId: string;
    type: $Enums.TransactionType;
    amount: Decimal | DecimalJsLike | number | string;
    units: Decimal | DecimalJsLike | number | string;
    nav: Decimal | DecimalJsLike | number | string;
    date: Date | string;
    status?: $Enums.TransactionStatus;
    createdAt?: Date | string;
  };

  export type WatchlistCreateManyUserInput = {
    id?: string;
    fundId: string;
    addedAt?: Date | string;
    createdAt?: Date | string;
  };

  export type AccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    type?: StringFieldUpdateOperationsInput | string;
    provider?: StringFieldUpdateOperationsInput | string;
    providerAccountId?: StringFieldUpdateOperationsInput | string;
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null;
    access_token?: NullableStringFieldUpdateOperationsInput | string | null;
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null;
    token_type?: NullableStringFieldUpdateOperationsInput | string | null;
    scope?: NullableStringFieldUpdateOperationsInput | string | null;
    id_token?: NullableStringFieldUpdateOperationsInput | string | null;
    session_state?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type AccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    type?: StringFieldUpdateOperationsInput | string;
    provider?: StringFieldUpdateOperationsInput | string;
    providerAccountId?: StringFieldUpdateOperationsInput | string;
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null;
    access_token?: NullableStringFieldUpdateOperationsInput | string | null;
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null;
    token_type?: NullableStringFieldUpdateOperationsInput | string | null;
    scope?: NullableStringFieldUpdateOperationsInput | string | null;
    id_token?: NullableStringFieldUpdateOperationsInput | string | null;
    session_state?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type AccountUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    type?: StringFieldUpdateOperationsInput | string;
    provider?: StringFieldUpdateOperationsInput | string;
    providerAccountId?: StringFieldUpdateOperationsInput | string;
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null;
    access_token?: NullableStringFieldUpdateOperationsInput | string | null;
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null;
    token_type?: NullableStringFieldUpdateOperationsInput | string | null;
    scope?: NullableStringFieldUpdateOperationsInput | string | null;
    id_token?: NullableStringFieldUpdateOperationsInput | string | null;
    session_state?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    sessionToken?: StringFieldUpdateOperationsInput | string;
    expires?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    sessionToken?: StringFieldUpdateOperationsInput | string;
    expires?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    sessionToken?: StringFieldUpdateOperationsInput | string;
    expires?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type PortfolioUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    holdings?: HoldingUpdateManyWithoutPortfolioNestedInput;
  };

  export type PortfolioUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    holdings?: HoldingUncheckedUpdateManyWithoutPortfolioNestedInput;
  };

  export type PortfolioUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type TransactionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    type?:
      | EnumTransactionTypeFieldUpdateOperationsInput
      | $Enums.TransactionType;
    amount?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    units?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    nav?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    date?: DateTimeFieldUpdateOperationsInput | Date | string;
    status?:
      | EnumTransactionStatusFieldUpdateOperationsInput
      | $Enums.TransactionStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    fund?: FundUpdateOneRequiredWithoutTransactionsNestedInput;
  };

  export type TransactionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    fundId?: StringFieldUpdateOperationsInput | string;
    type?:
      | EnumTransactionTypeFieldUpdateOperationsInput
      | $Enums.TransactionType;
    amount?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    units?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    nav?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    date?: DateTimeFieldUpdateOperationsInput | Date | string;
    status?:
      | EnumTransactionStatusFieldUpdateOperationsInput
      | $Enums.TransactionStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type TransactionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    fundId?: StringFieldUpdateOperationsInput | string;
    type?:
      | EnumTransactionTypeFieldUpdateOperationsInput
      | $Enums.TransactionType;
    amount?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    units?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    nav?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    date?: DateTimeFieldUpdateOperationsInput | Date | string;
    status?:
      | EnumTransactionStatusFieldUpdateOperationsInput
      | $Enums.TransactionStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type WatchlistUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    fund?: FundUpdateOneRequiredWithoutWatchlistNestedInput;
  };

  export type WatchlistUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    fundId?: StringFieldUpdateOperationsInput | string;
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type WatchlistUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    fundId?: StringFieldUpdateOperationsInput | string;
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type NavHistoryCreateManyFundInput = {
    id?: string;
    nav: Decimal | DecimalJsLike | number | string;
    date: Date | string;
    createdAt?: Date | string;
  };

  export type HoldingCreateManyFundInput = {
    id?: string;
    portfolioId: string;
    units: Decimal | DecimalJsLike | number | string;
    avgNav: Decimal | DecimalJsLike | number | string;
    investedAmount: Decimal | DecimalJsLike | number | string;
    purchaseDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type TransactionCreateManyFundInput = {
    id?: string;
    userId: string;
    type: $Enums.TransactionType;
    amount: Decimal | DecimalJsLike | number | string;
    units: Decimal | DecimalJsLike | number | string;
    nav: Decimal | DecimalJsLike | number | string;
    date: Date | string;
    status?: $Enums.TransactionStatus;
    createdAt?: Date | string;
  };

  export type WatchlistCreateManyFundInput = {
    id?: string;
    userId: string;
    addedAt?: Date | string;
    createdAt?: Date | string;
  };

  export type NavHistoryUpdateWithoutFundInput = {
    id?: StringFieldUpdateOperationsInput | string;
    nav?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    date?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type NavHistoryUncheckedUpdateWithoutFundInput = {
    id?: StringFieldUpdateOperationsInput | string;
    nav?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    date?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type NavHistoryUncheckedUpdateManyWithoutFundInput = {
    id?: StringFieldUpdateOperationsInput | string;
    nav?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    date?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type HoldingUpdateWithoutFundInput = {
    id?: StringFieldUpdateOperationsInput | string;
    units?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    avgNav?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    investedAmount?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    purchaseDate?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    portfolio?: PortfolioUpdateOneRequiredWithoutHoldingsNestedInput;
  };

  export type HoldingUncheckedUpdateWithoutFundInput = {
    id?: StringFieldUpdateOperationsInput | string;
    portfolioId?: StringFieldUpdateOperationsInput | string;
    units?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    avgNav?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    investedAmount?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    purchaseDate?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type HoldingUncheckedUpdateManyWithoutFundInput = {
    id?: StringFieldUpdateOperationsInput | string;
    portfolioId?: StringFieldUpdateOperationsInput | string;
    units?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    avgNav?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    investedAmount?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    purchaseDate?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type TransactionUpdateWithoutFundInput = {
    id?: StringFieldUpdateOperationsInput | string;
    type?:
      | EnumTransactionTypeFieldUpdateOperationsInput
      | $Enums.TransactionType;
    amount?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    units?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    nav?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    date?: DateTimeFieldUpdateOperationsInput | Date | string;
    status?:
      | EnumTransactionStatusFieldUpdateOperationsInput
      | $Enums.TransactionStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutTransactionsNestedInput;
  };

  export type TransactionUncheckedUpdateWithoutFundInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    type?:
      | EnumTransactionTypeFieldUpdateOperationsInput
      | $Enums.TransactionType;
    amount?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    units?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    nav?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    date?: DateTimeFieldUpdateOperationsInput | Date | string;
    status?:
      | EnumTransactionStatusFieldUpdateOperationsInput
      | $Enums.TransactionStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type TransactionUncheckedUpdateManyWithoutFundInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    type?:
      | EnumTransactionTypeFieldUpdateOperationsInput
      | $Enums.TransactionType;
    amount?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    units?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    nav?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    date?: DateTimeFieldUpdateOperationsInput | Date | string;
    status?:
      | EnumTransactionStatusFieldUpdateOperationsInput
      | $Enums.TransactionStatus;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type WatchlistUpdateWithoutFundInput = {
    id?: StringFieldUpdateOperationsInput | string;
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutWatchlistNestedInput;
  };

  export type WatchlistUncheckedUpdateWithoutFundInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type WatchlistUncheckedUpdateManyWithoutFundInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type HoldingCreateManyPortfolioInput = {
    id?: string;
    fundId: string;
    units: Decimal | DecimalJsLike | number | string;
    avgNav: Decimal | DecimalJsLike | number | string;
    investedAmount: Decimal | DecimalJsLike | number | string;
    purchaseDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type HoldingUpdateWithoutPortfolioInput = {
    id?: StringFieldUpdateOperationsInput | string;
    units?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    avgNav?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    investedAmount?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    purchaseDate?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    fund?: FundUpdateOneRequiredWithoutHoldingsNestedInput;
  };

  export type HoldingUncheckedUpdateWithoutPortfolioInput = {
    id?: StringFieldUpdateOperationsInput | string;
    fundId?: StringFieldUpdateOperationsInput | string;
    units?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    avgNav?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    investedAmount?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    purchaseDate?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type HoldingUncheckedUpdateManyWithoutPortfolioInput = {
    id?: StringFieldUpdateOperationsInput | string;
    fundId?: StringFieldUpdateOperationsInput | string;
    units?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    avgNav?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    investedAmount?:
      | DecimalFieldUpdateOperationsInput
      | Decimal
      | DecimalJsLike
      | number
      | string;
    purchaseDate?:
      | NullableDateTimeFieldUpdateOperationsInput
      | Date
      | string
      | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number;
  };

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF;
}
