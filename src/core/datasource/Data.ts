import { AddOperation, CopyOperation, MoveOperation, RemoveOperation, ReplaceOperation, TestOperation } from 'fast-json-patch/lib/core';
import * as Observable from 'zen-observable'

type Change<T> =
  | AddOperation<T>
  | RemoveOperation
  | ReplaceOperation<T>
  | MoveOperation
  | CopyOperation
  | TestOperation<T>

export class Data<T = {}> implements PromiseLike<T> {
  static of<T>(value: T) {
    return new Data(
      async () => value,
      Observable.of()
    )
  }

  private constructor(
    private initial: () => Promise<T>,
    private $: Observable<Change<T>>
  ) { }

  then<TResult1 = T, TResult2 = never>(
    onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
  ): PromiseLike<TResult1 | TResult2> {
    return this.initial().then(onfulfilled, onrejected)
  }
}
