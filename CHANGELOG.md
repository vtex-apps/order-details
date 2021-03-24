# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- CSS Handles `updateOrderButton`, `myOrdersButton`, and `cancelOrderButton` on `OrderOptions`.

## [1.2.0] - 2021-03-10

## Added

- Added CSS Handles `paymentGroup` & `paymentValue` on PaymentMethod
- Added CSS Handle `addressContainer` on Address

## [1.1.1] - 2020-11-16
### Fixed
- Redirect to login when trying to print bank invoice while not logged-in.

## [1.1.0] - 2020-05-11

### Added

- CSS Handles for CustomerInfo component

## [1.0.2] - 2019-12-10

### Changed

- Repo configs based on [React-app Template](https://github.com/vtex-apps/react-app-template/)

## [1.0.1] - 2019-11-13

## [1.0.0] - 2019-02-27

### Changed

- Props expected by ProductImage component
- Props expected by OrderHeader component
- Delete legacy components from MyOrders
- Props expected by ButtonLink component

### Fixed

- CustomerInfo component did not take into account `document` not being present in every country
- Typings for `render-runtime`
- Layout adjustments

### Added

- Components to be exported
- README first draft

## [0.1.0] - 2019-02-21

### Added

- Components from OrderPlaced
- Configuration for TypeScript

### Changed

- Builder version for Messages

## [0.0.1-beta] - 2019-01-21

### Added

- Initialize repo.
