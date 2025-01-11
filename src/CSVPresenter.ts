import { Output } from "./GenerateInvoices"
import Presenter from "./Presenter";
import moment from "moment";

export default class CsvPresenter implements Presenter {

	present(output: Output[]): any {
		const lines: any[] = [];
		for (const data of output) {
			const line: string[] = [];
			line.push(moment(data.date).format("YYYY-MM-DD"));
			line.push(`${data.amount}`);
			lines.push(line.join(";"));
		}
		return lines.join("\n");
	}

}