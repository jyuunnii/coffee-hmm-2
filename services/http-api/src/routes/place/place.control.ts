import Exception, { ExceptionCode } from '../../util/error';
import handler from '../handler';

export const getList = handler(() => {
  throw new Exception(ExceptionCode.notImplemented);
});

export const create = handler(() => {
  throw new Exception(ExceptionCode.notImplemented);
});

export const updateOne = handler(() => {
  throw new Exception(ExceptionCode.notImplemented);
});

export const deleteList = handler(() => {
  throw new Exception(ExceptionCode.notImplemented);
});

export const deleteOne = handler(() => {
  throw new Exception(ExceptionCode.notImplemented);
});