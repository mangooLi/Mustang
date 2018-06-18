import {Container} from "inversify";
import {TYPES} from "./types";
import {ConfigurationManager} from "./configuration/ConfigurationManager";
import {JsonConfigurationManager} from "./configuration/JsonConfigurationManager";
import { CommandHandler } from "./handler/CommandHandler";

const selfContainer = new Container();
selfContainer.bind<ConfigurationManager>(TYPES.Configuration).to(JsonConfigurationManager).inSingletonScope();
selfContainer.bind<CommandHandler>(TYPES.CommandHandler).to(CommandHandler);

export { selfContainer };