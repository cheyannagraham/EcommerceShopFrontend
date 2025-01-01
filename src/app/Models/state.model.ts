export class StateModel{
  constructor(public id:number,
              public name:number,
              public countryId:number){

  }
}

export interface StateListResponse{
  _embedded: {
    states: StateModel[]
  }
}
