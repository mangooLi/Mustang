import {Container} from "inversify";
import {TYPES} from "./types";
import {ConfigurationManager} from "./configuration/ConfigurationManager";
import {JsonConfigurationManager} from "./configuration/JsonConfigurationManager";

const selfContainer = new Container();
selfContainer.bind<ConfigurationManager>(TYPES.Configuration).to(JsonConfigurationManager).inSingletonScope();

export { selfContainer };