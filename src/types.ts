/* IOC注入标志 */

const TYPES = {
    Configuration: Symbol.for("Configuration"),
    CommandHandler: Symbol.for("CommandHandler")
}

export { TYPES };